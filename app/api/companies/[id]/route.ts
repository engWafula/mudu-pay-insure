import { logAction } from "@/app/lib/auditLog";
import { authOptions } from "@/app/lib/authOptions";
import { db } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
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


export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;


    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Delete the company
    const deletedCompany = await db.company.delete({
      where: { id },
    });

    const admin: any = await db.admin.findFirst({
      where: {
        //@ts-ignore
        email: session.email
      }
    });

    await logAction(
      //@ts-ignore
      admin.id,
      'DELETE',
      `Company deleted: ${deletedCompany.name}`,
      `Deleted by ${admin.name}`
    );

    return NextResponse.json({ message: 'Company deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error deleting company', details: error.message },
      { status: 500 }
    );
  }
};


export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const data = await req.json();
    const { id } = params;

    const { name, registrationNo } = data;

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!id || !name || !registrationNo) {
      return NextResponse.json(
        { error: 'ID, Name, and Registration Number are required' },
        { status: 400 }
      );
    }

    // Update the company
    const updatedCompany = await db.company.update({
      where: { id },
      data: { name, registrationNo },
    });

    const admin: any = await db.admin.findFirst({
      where: {
        //@ts-ignore
        email: session.email
      }
    });

    await logAction(
      //@ts-ignore
      admin.id,
      'UPDATE',
      `Company updated: ${updatedCompany.name}`,
      `Updated by ${admin.name}`
    );

    return NextResponse.json(updatedCompany, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error updating company', details: error.message },
      { status: 500 }
    );
  }
};