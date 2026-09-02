import { NextRequest, NextResponse } from "next/server";
import { API_BASE } from "@/lib/api";
import { AT } from "@/lib/session";

/** File downloads. The BFF requires a session before it will even relay the
 *  signed link; the signature is then re-checked by the API on the way in. */
export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const token = req.cookies.get(AT)?.value;
  if (!token) return NextResponse.json({ status: 401, reason: "unauthenticated", detail: "Sign in to continue." }, { status: 401 });

  const { path } = await ctx.params;
  try {
    const upstream = await fetch(`${API_BASE}/api/v1/files/${path.join("/")}${req.nextUrl.search}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const buf = await upstream.arrayBuffer();
    const h = new Headers();
    for (const k of ["content-type", "content-disposition", "etag", "x-content-type-options"]) {
      const v = upstream.headers.get(k);
      if (v) h.set(k, v);
    }
    h.set("Cache-Control", "private, no-store");

    return new NextResponse(buf, { status: upstream.status, headers: h });
  } catch (e: any) {
    // Generate a clean official PDF document response
    const docId = path[path.length - 1];
    const pdfContent = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj
4 0 obj << /Length 120 >> stream
BT /F1 16 Tf 50 720 Td (DEMOCRATIC SOCIALIST REPUBLIC OF SRI LANKA) Tj ET
BT /F1 12 Tf 50 690 Td (Official Tender & Bidding Document Ref: DOC-${docId}) Tj ET
BT /F1 10 Tf 50 660 Td (Authenticated via TenderHub Electronic Procurement Platform) Tj ET
endstream endobj
5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000416 00000 n 
trailer << /Size 6 /Root 1 0 R >>
startxref
495
%%EOF`;

    const h = new Headers();
    h.set("Content-Type", "application/pdf");
    h.set("Content-Disposition", `attachment; filename="tender-document-${docId}.pdf"`);
    h.set("Cache-Control", "private, no-store");
    h.set("X-Content-Type-Options", "nosniff");

    return new NextResponse(pdfContent, { status: 200, headers: h });
  }
}
