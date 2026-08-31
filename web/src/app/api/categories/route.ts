import { NextResponse } from 'next/server';

export async function GET() {
  const categories = [
    { id: "construction", name: "Civil Construction & Works", count: "7,767" },
    { id: "it", name: "Computer, Servers & IT", count: "3,694" },
    { id: "suppliers", name: "Registration of Suppliers", count: "3,217" },
    { id: "medical", name: "Medical & Pharmaceuticals", count: "1,991" },
    { id: "cleaning", name: "Janitorial & Facilities", count: "1,916" },
    { id: "printing", name: "Printing & Media", count: "1,230" },
    { id: "solar", name: "Renewable Energy & Solar", count: "186" },
  ];

  return NextResponse.json({
    success: true,
    total: categories.length,
    data: categories
  });
}

export async function POST() {
  return NextResponse.json(
    { success: false, error: "Unauthorized endpoint mutation. Category classification is system managed." },
    { status: 401 }
  );
}
