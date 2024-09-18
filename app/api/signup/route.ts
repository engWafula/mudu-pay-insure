import { db } from "@/app/lib/prisma";
import { Admin } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// Function to handle admin creation with roles
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password, role } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Validate password
    if (!password || password.length < 5) {
      return NextResponse.json({ error: "Password must be at least 5 characters" }, { status: 400 });
    }

    // Check if user with the same email already exists
    const existingUser: Admin | null = await db.admin.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Default role to 'ADMIN' if not provided
    const userRole = role ? role : 'ADMIN';

    // Create the new admin user with role
    const createdUser: Admin = await db.admin.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: userRole  // Save role in database
      }
    });

    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
