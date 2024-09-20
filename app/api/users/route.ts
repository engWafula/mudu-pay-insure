import { db } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest,res:NextResponse) => {
    try {
      const data = await db.admin.findMany({
        orderBy: {
          createdAt: 'desc',
        }
      })

  
      return NextResponse.json(data, { status: 201 });
    } catch (error:any) {
      // Handle errors, like unique constraint violations
      return NextResponse.json(
        { error: 'Error creating company', details: error.message  },
        { status: 500 }
      );
    }
  };


