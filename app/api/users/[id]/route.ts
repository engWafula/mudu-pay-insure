import { db } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const { id } = params;
  
      if (!id) {
        return NextResponse.json(
          { error: 'Admin ID is required' },
          { status: 400 }
        );
      }
  
      // Delete the admin record by ID
      const deletedAdmin = await db.admin.delete({
        where: {
          id: id,
        },
      });
  
      return NextResponse.json(
        { message: 'Admin deleted successfully', deletedAdmin },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Error deleting admin', details: error.message },
        { status: 500 }
      );
    }
  };



export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const { email, name, role } = await req.json(); // Destructure updated fields from request body

  try {
    const updatedUser = await db.admin.update({
      where: { id },
      data: { email, name, role },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update user', details: error.message }, { status: 500 });
  }
};
