import { NextResponse } from "next/server";

import Payment from "@/models/Payment";
import connectDb from "@/lib/connectDB";

export async function POST(request) {

  try {

    await connectDb();

    const formData = await request.formData();

    const razorpay_order_id =
      formData.get("razorpay_order_id");

    if (!razorpay_order_id) {

      return NextResponse.json({
        success: false,
        error: "Order ID missing",
      });
    }

    const payment =
      await Payment.findOneAndUpdate(

        {
          oid: razorpay_order_id,
        },

        {
          done: true,
        },

        {
          new: true,
        }
      );

    if (!payment) {

      return NextResponse.json({
        success: false,
        error: "Payment not found",
      });
    }

    return NextResponse.redirect(

      `${process.env.NEXT_PUBLIC_URL}/${payment.to_user}?paymentdone=true`

    );

  }

  catch (error) {

    return NextResponse.json({

      success: false,
      error: error.message,

    });
  }
}