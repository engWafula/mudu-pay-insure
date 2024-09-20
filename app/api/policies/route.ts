// app/api/policies/route.ts
import { logAction } from '@/app/lib/auditLog';
import { db } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/lib/authOptions';


export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
  
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    

  try {
    // Parse the request body
    const { companyId, policyNumber, status, expirationDate,policyName,insurerId } = await req.json();
    // Check if the  required fields are provided
    if (!companyId || !policyNumber || !insurerId || !status || !expirationDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if the company exists
    const company = await db.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    // Create a new policy
    const policy = await db.policy.create({
      data: {
        companyId,
        policyNumber,
        insurerId,
        status,
        policyName,
        expirationDate: new Date(expirationDate),
      },
    });

    const admin = await db.admin.findFirst({
        where:{
            //@ts-ignore
            email:session.email
        }
    })

       await logAction(
     //@ts-ignore
        admin.id,
        'CREATE',
        `Policy ID ${policy.id}`,
        `Created new policy with ID ${policy.id}`
      );

    return NextResponse.json(policy, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


export const GET = async (req: NextRequest,res:NextResponse) => {
    try {
      const data = await db.policy.findMany({
        include:{
          insurer:true,
          company:true
        },
        orderBy: {
          createdAt: 'desc',
        }
      })
      return NextResponse.json(data, { status: 201 });
    } catch (error:any) {
      return NextResponse.json(
        { error: 'Error fetching', details: error.message  },
        { status: 500 }
      );
    }
  };
