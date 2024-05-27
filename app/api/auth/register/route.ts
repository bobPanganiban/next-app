import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user
  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword: hashedPassword,
    },
  });

  return NextResponse.json({ message: "User created" }, { status: 201 });
}
