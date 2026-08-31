import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      liveNotices: 366,
      closingThisWeek: 41,
      publishedToday: 12,
      totalArchive: 39942,
      activeSuppliers: 3217
    }
  });
}
