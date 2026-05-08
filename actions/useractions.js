"use server"

import Razorpay from "razorpay"
import connectDb from "@/lib/connectDB"
import Payment from "@/models/Payment"

export const initiate = async (
  amount,
  to_user,
  paymentform
) => {

  try {

    await connectDb()

    const razorpay = new Razorpay({

      key_id: process.env.RAZORPAY_KEY_ID,

      key_secret: process.env.RAZORPAY_KEY_SECRET,

    })

    const options = {

      amount: Number(amount) * 100,

      currency: "INR",

      receipt: `receipt_${Date.now()}`,

    }

    const order =
      await razorpay.orders.create(options)

    await Payment.create({

      oid: order.id,

      amount: Number(amount),

      to_user: to_user,

      name: paymentform.name,

      message: paymentform.message,

      done: false,

    })

    return {

      ...order,

      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

    }

  }

  catch (error) {

    console.log(error)

    throw new Error(error.message)

  }
}