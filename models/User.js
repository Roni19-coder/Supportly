import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
    },

    bio: {
      type: String,
    },

    profilePic: {
      type: String,
    },

    coverPic: {
      type: String,
    },

    amount: {
      type: Number,
      default: 0,
    },

    razorpayId: {
      type: String,
    },

    razorpaySecret: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.models.User ||
  mongoose.model("User", UserSchema)