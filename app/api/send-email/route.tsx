import WelcomeTemplate from "@/emails/WelcomeTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  await resend.emails.send({
    from: "",
    to: "czartmpanganiban@gmail.com",
    subject: "Welcome",
    react: <WelcomeTemplate name="Bob" />,
  });

  return NextResponse.json({});
}
