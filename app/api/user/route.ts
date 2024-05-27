import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const email = url.searchParams.get("email");

  if (!email)
    return NextResponse.json(
      { message: "Invalid request, missing email" },
      { status: 400 }
    );

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return NextResponse.json(user, { status: 200 });
}
