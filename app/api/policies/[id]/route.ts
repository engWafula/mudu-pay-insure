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
        const { companyId, policyNumber, status, expirationDate, policyName, insurerId } = await req.json();

        // Check if the required fields are provided
        if (!companyId || !policyNumber || !insurerId || !status || !expirationDate) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if the company exists
        const company = await db.company.findUnique({
            where: { id: companyId },
        });

        if (!company) {
            return NextResponse.json({ error: 'Company not found' }, { status: 404 });
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
            where: {
                //@ts-ignore
                email: session.email
            }
        });

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
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Update a policy (PUT)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Parse the request body
        const {  companyId, policyNumber, status, expirationDate, policyName, insurerId } = await req.json();
        const {id} = params

        // Check if the required fields are provided
        if (!id || !companyId || !policyNumber || !insurerId || !status || !expirationDate) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if the policy exists
        const policy = await db.policy.findUnique({
            where: { id },
            include:{
                company: true,
            }
        });

        if (!policy) {
            return NextResponse.json({ error: 'Policy not found' }, { status: 404 });
        }

        // Update the policy
        const updatedPolicy = await db.policy.update({
            where: { id },
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
            where: {
                //@ts-ignore
                email: session.email
            }
        });

        await logAction(
            //@ts-ignore
            admin.id,
            'UPDATE',
            `Policy Updated ${updatedPolicy.policyName}`,
            `Policy owned by: ${policy.company.name}`
        );

        return NextResponse.json(updatedPolicy, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Delete a policy (DELETE)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Parse the request for the policy ID
        const {id} = params
        if (!id) {
            return NextResponse.json({ error: 'Policy ID is required' }, { status: 400 });
        }

        // Check if the policy exists
        const policy = await db.policy.findUnique({
            where: { id },
            include:{
                company: true,
            }
        });

        if (!policy) {
            return NextResponse.json({ error: 'Policy not found' }, { status: 404 });
        }

        // Delete the policy
        await db.policy.delete({
            where: { id },
        });

        const admin = await db.admin.findFirst({
            where: {
                //@ts-ignore
                email: session.email
            }
        });

        await logAction(
            //@ts-ignore
            admin.id,
            'DELETE',
            `Policy deleted :${policy.policyName}`,
            `Policy ownwed by: ${policy.company.name}`
        );

        return NextResponse.json({ message: 'Policy deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
