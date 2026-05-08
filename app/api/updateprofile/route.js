import { NextResponse } from "next/server"
import connectDb from "@/lib/connectDB"
import User from "@/models/User"

export async function POST(req) {

  try {

    await connectDb()

    const body = await req.json()

    const updatedUser = await User.findOneAndUpdate(

      { email: body.email },

      {
        name: body.name,
        bio: body.bio,
        profilePic: body.profilePic,
        coverPic: body.coverPic,
      },

      { new: true }

    )

    return NextResponse.json({
      success: true,
      user: updatedUser,
    })

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: error.message,
    })

  }
}