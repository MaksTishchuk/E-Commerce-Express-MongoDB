import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    // cart: {
    //   type: Array,
    //   default: [],
    // },
    address: {
      type: String,
      default: ''
    },
    // wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    // refreshToken: {
    //   type: String,
    // },
    // passwordChangedAt: Date,
    // passwordResetToken: String,
    // passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', userSchema)