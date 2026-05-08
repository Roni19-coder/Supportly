import { NextResponse } from "next/server";
import Payment from "@/models/Payment";
import connectDb from "@/lib/connectDB";

export async function GET(request) {

  await connectDb();

  const { searchParams } = new URL(request.url);

  const username = searchParams.get("username");

  const payments = await Payment.find({
    to_user: username,
    done: true,
  }).sort({ amount: -1 });

  return NextResponse.json(payments);
}