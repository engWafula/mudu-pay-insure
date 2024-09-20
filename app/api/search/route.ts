import { logAction } from "@/app/lib/auditLog";
import { authOptions } from "@/app/lib/authOptions";
import { db } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const searchQuery = url.searchParams.get("search") || "";

    // Fetch companies matching the search query
    const data = await db.company.findMany({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive", // Case-insensitive search
        },
      },
      include: {
        policies: true, 
      },
    });
    const found = data.length>0?`User found company called ${searchQuery}`:`User didn't find company called ${searchQuery}`
        //Log the action of creating an insurer
        await logAction(
          null,
          'SEARCH',
          `User searched for ${searchQuery}`,
          `${found}`
        );

    return NextResponse.json({ companies: data }, { status: 200 });
  } catch (error: any) {
    // Handle errors, like unique constraint violations
    return NextResponse.json(
      { error: 'Error fetching companies', details: error.message },
      { status: 500 }
    );
  }
};
