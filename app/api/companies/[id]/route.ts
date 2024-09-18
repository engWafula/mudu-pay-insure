import { db } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest,{ params }: { params: { planId: string } }) {
    const { id }:any = params;

    const info = await db.company.findUnique({
      where: { id: id },
      include: {
      policies:true
      },
    });
      
    const data = info

  return NextResponse.json(data, { status: 201 });

  }