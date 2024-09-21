import { logAction } from "@/app/lib/auditLog";
import { authOptions } from "@/app/lib/authOptions";
import { db } from "@/app/lib/prisma";
import { Admin } from "@prisma/client";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

// Function to send an email
export async  function sendAccountEmail(email: string, name: string, password: string) {
  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use any SMTP provider, like SendGrid or custom SMTP
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail or SMTP email
      pass: process.env.EMAIL_PASS, // Your Gmail or SMTP password
    },
  });

  const info =  "Worker's Compensation Information Portal"


  // Email content
  const mailOptions = {
    from: `${process.env.EMAIL_USER} Worker's Compensation Information Portal`, // Sender's email address
    to: email, // Recipient's email
    subject: 'Account Created Successfully ', // Email subject
    text: `Hello ${name},\n\nYour account has been successfully created. Your login details are as follows:\nEmail: ${email}\nPassword: ${password}\n\nPlease log in and start managing information.\n\nBest regards,\nThe Admin Team`, // Plain text email body
    html: `<p>Hello ${name},</p><p>Your account has been successfully created. Here are your login details:</p><p><b>Email:</b> ${email}<br/><b>Password:</b> ${password}</p><p>Please log in and start managing information.</p><p>Best regards,<br/>The Admin Team</p>`, // HTML email body
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
  
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    

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
         `User created: ${createdUser.id}`,
         `Created new user with Name ${createdUser.name}`
       );

       await sendAccountEmail(email, name, password);


    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
