import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';
import { db } from '@/app/lib/prisma';
import { logAction } from '@/app/lib/auditLog';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  // Ensure the session exists (user is authenticated)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Parse the request body
    const { name, registrationId, phoneNumber, address, website, contactPerson } = await req.json();

    // Check if the required fields are provided
    if (!name || !registrationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a new insurer
    const insurer = await db.insurer.create({
      data: {
        name,
        registrationId,
        phoneNumber: phoneNumber ?? null,
        address: address ?? null,
        website: website ?? null,
        contactPerson: contactPerson ?? null,
      },
    });

    // Get admin based on the session email
    const admin = await db.admin.findFirst({
      where: {
        //@ts-ignore
        email: session?.user?.email,  // Access the email from the session object
      },
    });

    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    //Log the action of creating an insurer
    await logAction(
      admin.id,
      'CREATE',
      `Insurer ID ${insurer.id}`,
      `Created new insurer : ${insurer.name}`
    );

    return NextResponse.json(insurer, { status: 201 });
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
      const data = await db.insurer.findMany({
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
