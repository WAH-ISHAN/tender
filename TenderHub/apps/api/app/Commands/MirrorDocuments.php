<?php

namespace App\Commands;

use App\Libraries\DocumentStore;
use CodeIgniter\CLI\BaseCommand;
use CodeIgniter\CLI\CLI;

/**
 * php spark documents:mirror [--limit n] [--notice id] [--retry]
 *
 * Agency sites take documents down mid-tender. A notice closing in three weeks
 * routinely loses its bill of quantities in week two, and "the link is dead" is
 * the complaint that makes an aggregator useless. Once the bytes are here, they
 * stay here.
 *
 * Deliberately polite: one at a time, a user agent that identifies us, a connect
 * and read timeout, and an abort past 40 MB rather than pulling a huge file into
 * memory. A crawler that hammers a ministry site gets the whole platform blocked
 * and there is no technical recovery from that.
 */
class MirrorDocuments extends BaseCommand
{
    protected $group       = 'TenderHub';
    protected $name        = 'documents:mirror';
    protected $description = 'Fetch documents we have recorded but not stored.';
    protected $usage       = 'documents:mirror [--limit n] [--notice id] [--retry]';

    private const UA = 'TenderHubBot/1.0 (+https://tenderhub.lk/bot; documents@tenderhub.lk)';

    public function run(array $params)
    {
        $limit  = (int) (CLI::getOption('limit') ?: 25);
        $notice = (int) (CLI::getOption('notice') ?: 0);
        $retry  = (bool) CLI::getOption('retry');

        $db = db_connect();
        $b  = $db->table('notice_documents')->where('mirrored_at', null)->where('source_url IS NOT NULL', null, false);

        // A failure is recorded on the row with its reason and skipped on later
        // runs unless --retry, so one permanently dead link does not consume the
        // whole nightly run.
        if (! $retry) {
            $b->where('mirror_error', null);
        }
        if ($notice) {
            $b->where('notice_id', $notice);
        }

        $rows  = $b->limit($limit)->get()->getResultArray();
        $store = new DocumentStore();
        $ok    = $failed = $deduped = 0;

        if (! $rows) {
            CLI::write('Nothing to mirror.', 'yellow');

            return 0;
        }

        foreach ($rows as $doc) {
            CLI::write('→ ' . $doc['name'], 'white');

            $result = $this->fetch($doc['source_url']);

            if ($result['error'] !== null) {
                $db->table('notice_documents')->where('id', $doc['id'])
                    ->update(['mirror_error' => substr($result['error'], 0, 255), 'updated_at' => date('Y-m-d H:i:s')]);
                CLI::error('  failed: ' . $result['error']);
                $failed++;
                usleep(500000);
                continue;
            }

            $ext    = strtolower(pathinfo(parse_url($doc['source_url'], PHP_URL_PATH) ?: '', PATHINFO_EXTENSION) ?: 'pdf');
            $stored = $store->put($result['body'], $ext);

            $db->table('notice_documents')->where('id', $doc['id'])->update([
                'sha256' => $stored['sha256'], 'path' => $stored['path'], 'size_bytes' => $stored['size'],
                'mirrored_at' => date('Y-m-d H:i:s'), 'mirror_error' => null,
                'updated_at' => date('Y-m-d H:i:s'),
            ]);

            $stored['deduped'] ? $deduped++ : null;
            CLI::write('  stored ' . substr($stored['sha256'], 0, 12) . ' (' . $stored['size'] . ' bytes)'
                . ($stored['deduped'] ? ' [deduped]' : ''), 'green');
            $ok++;

            usleep(500000); // one at a time, unhurried
        }

        CLI::write(sprintf('Mirrored %d, deduped %d, failed %d.', $ok, $deduped, $failed), 'cyan');

        return 0;
    }

    /** @return array{body:string,error:?string} */
    private function fetch(string $url): array
    {
        if (! function_exists('curl_init')) {
            return ['body' => '', 'error' => 'curl unavailable'];
        }

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS      => 3,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_TIMEOUT        => 60,
            CURLOPT_USERAGENT      => self::UA,
            CURLOPT_NOPROGRESS     => false,
            // Abort mid-download past 40 MB rather than pulling a huge file
            // into memory.
            CURLOPT_PROGRESSFUNCTION => static fn ($r, $dlTotal, $dlNow) => $dlNow > DocumentStore::MAX_BYTES ? 1 : 0,
        ]);

        $body = curl_exec($ch);
        $err  = curl_error($ch);
        $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($body === false) {
            return ['body' => '', 'error' => $err ?: 'transfer failed'];
        }
        if ($code >= 400) {
            return ['body' => '', 'error' => 'HTTP ' . $code];
        }
        if (strlen($body) === 0) {
            return ['body' => '', 'error' => 'empty response'];
        }

        return ['body' => $body, 'error' => null];
    }
}
