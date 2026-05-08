import { NextResponse } from "next/server"
import connectDb from "@/lib/connectDB"
import User from "@/models/User"

export async function GET(req) {
  try {
    await connectDb()

    const { searchParams } = new URL(req.url)

    const email = searchParams.get("email")

    const user = await User.findOne({ email })

    return NextResponse.json({
      success: true,
      user,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}