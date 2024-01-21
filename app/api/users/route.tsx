import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const emailExists = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (emailExists)
    return NextResponse.json({ error: "Email Exists" }, { status: 500 });

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const user = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword: hashedPassword,
    },
  });
  return NextResponse.json({ email: user.email }, { status: 201 });
}
