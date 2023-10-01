import mongoose from "mongoose"

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    start: {
      type: Date,
      required: true,
      default: Date.now
    },
    expire: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Coupon', couponSchema)
