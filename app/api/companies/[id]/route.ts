import { db } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    const companyInfo = await db.company.findUnique({
      where: { id },
      include: {
        policies: {
          include: {
            insurer: true, 
          },
        },
      },
    });

    if (!companyInfo) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    return NextResponse.json(companyInfo, { status: 200 });
}
