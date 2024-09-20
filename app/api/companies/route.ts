// app/api/companies/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';
import { logAction } from '@/app/lib/auditLog';


export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    const session = await getServerSession(authOptions);
  
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    

    const { name, registrationNo } = data;

    // Validate input
    if (!name || !registrationNo) {
      return NextResponse.json(
        { error: 'Name and registration number are required' },
        { status: 400 }
      );
    }

    // Create a new company
    const company = await db.company.create({
      data: {
        name,
        registrationNo,
      },
    });

    const admin:any = await db.admin.findFirst({
      where:{
          //@ts-ignore
          email:session.email
      }
  })

    await logAction(
      //@ts-ignore
         admin.id,
         'CREATE',
         `Company created: ${company.name}`,
         `Created by ${admin.name}`
       );

    return NextResponse.json(company, { status: 201 });
  } catch (error:any) {
    // Handle errors, like unique constraint violations
    return NextResponse.json(
      { error: 'Error creating company', details: error.message  },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest,res:NextResponse) => {
  try {
    const data = await db.company.findMany({
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




