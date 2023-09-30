import BrandModel from '../models/brand.model.js'
import {MyError} from "../exceptions/myError.js"
import {validateMongoId} from "../utils/validateMongoId.js"

export const createBrand = async (req, res) => {
  const newBrand = await BrandModel.create({...req.body})
  res.json(newBrand)
}

export const getBrand = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const findBrand = await BrandModel.findById(id).select('-__v')
  if (!findBrand) throw new MyError('Brand was not found!', 404)
  res.json(findBrand)
}

export const getAllBrands = async (req, res) => {
  const brands = await BrandModel.find({}, {__v: 0}).sort('-createdAt')
  res.json(brands)
}

export const updateBrand = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const updatedBrand = await BrandModel.findByIdAndUpdate(id, req.body, {new: true}).select('-__v')
  if (!updatedBrand) throw new MyError('Brand was not updated!', 400)
  res.json(updatedBrand)
}

export const deleteBrand = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const deletedBrand = await BrandModel.findByIdAndDelete(id).select('-__v')
  if (!deletedBrand) throw new MyError('Brand was not deleted!', 404)
  res.json(deletedBrand)
}
