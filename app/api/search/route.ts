import { db } from "@/app/lib/prisma";
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

    return NextResponse.json({ companies: data }, { status: 200 });
  } catch (error: any) {
    // Handle errors, like unique constraint violations
    return NextResponse.json(
      { error: 'Error fetching companies', details: error.message },
      { status: 500 }
    );
  }
};
