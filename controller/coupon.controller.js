import CouponModel from '../models/coupon.model.js'
import {MyError} from "../exceptions/myError.js"
import {validateMongoId} from "../utils/validateMongoId.js"

export const createCoupon = async (req, res) => {
  const newCoupon = await CouponModel.create({...req.body})
  res.json(newCoupon)
}

export const getCoupon = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const findCoupon = await CouponModel.findById(id).select('-__v')
  if (!findCoupon) throw new MyError('Coupon was not found!', 404)
  res.json(findCoupon)
}

export const getAllCoupons = async (req, res) => {
  const coupons = await CouponModel.find({}, {__v: 0}).sort('-createdAt')
  res.json(coupons)
}

export const updateCoupon = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const updatedCoupon = await CouponModel.findByIdAndUpdate(id, req.body, {new: true}).select('-__v')
  if (!updatedCoupon) throw new MyError('Coupon was not updated!', 400)
  res.json(updatedCoupon)
}

export const deleteCoupon = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const deletedCoupon = await CouponModel.findByIdAndDelete(id).select('-__v')
  if (!deletedCoupon) throw new MyError('Coupon was not deleted!', 404)
  res.json(deletedCoupon)
}
