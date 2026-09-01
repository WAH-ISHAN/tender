import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-50">
      <header className="border-b border-ink-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center px-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-brand-600 text-[15px] font-bold text-white">T</span>
            <span className="text-[17px] font-semibold tracking-tight text-ink-900">TenderHub</span>
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
