import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';
import { db } from '@/app/lib/prisma';
import { logAction } from '@/app/lib/auditLog';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  // Ensure the session exists (user is authenticated)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  try {
    // Find the insurer by ID
    const insurer = await db.insurer.findUnique({
      where: { id },
    });

    if (!insurer) {
      return NextResponse.json({ error: 'Insurer not found' }, { status: 404 });
    }

    // Delete the insurer
    await db.insurer.delete({
      where: { id },
    });

    // Get admin based on the session email
    const admin = await db.admin.findFirst({
      where: {
        //@ts-ignore
        email: session?.user?.email,
      },
    });

    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    // Log the deletion action
    await logAction(
      admin.id,
      'DELETE',
      `Deleted insurer : ${insurer.name}`,
      `Deleted by ${admin.name}`,
    );

    return NextResponse.json({ message: 'Insurer deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
  
    // Ensure the session exists (user is authenticated)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  
    const { id } = params;
  
    try {
      // Parse the request body for the updated fields
      const { name, registrationId, phoneNumber, address, website, contactPerson } = await req.json();
  
      // Check if required fields are provided
      if (!name || !registrationId) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }
  
      // Find the insurer by ID
      const insurer = await db.insurer.findUnique({
        where: { id },
      });
  
      if (!insurer) {
        return NextResponse.json({ error: 'Insurer not found' }, { status: 404 });
      }
  
      // Update the insurer
      const updatedInsurer = await db.insurer.update({
        where: { id },
        data: {
          name,
          registrationId,
          phoneNumber: phoneNumber ?? insurer.phoneNumber,
          address: address ?? insurer.address,
          website: website ?? insurer.website,
          contactPerson: contactPerson ?? insurer.contactPerson,
        },
      });
  
      // Get admin based on the session email
      const admin = await db.admin.findFirst({
        where: {
          //@ts-ignore
          email: session?.user?.email,
        },
      });
  
      if (!admin) {
        return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
      }
  
      // Log the update action
      await logAction(
        admin.id,
        'UPDATE',
        `Insurer updated : ${insurer.name}`,
        `Updated by: ${admin.name}`
      );
  
      return NextResponse.json(updatedInsurer, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
