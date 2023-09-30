import ColorModel from '../models/color.model.js'
import {MyError} from "../exceptions/myError.js"
import {validateMongoId} from "../utils/validateMongoId.js"

export const createColor = async (req, res) => {
  const newColor = await ColorModel.create({...req.body})
  res.json(newColor)
}

export const getColor = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const findColor = await ColorModel.findById(id).select('-__v')
  if (!findColor) throw new MyError('Color was not found!', 404)
  res.json(findColor)
}

export const getAllColors = async (req, res) => {
  const color = await ColorModel.find({}, {__v: 0}).sort('-createdAt')
  res.json(color)
}

export const updateColor = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const updatedColor = await ColorModel.findByIdAndUpdate(id, req.body, {new: true}).select('-__v')
  if (!updatedColor) throw new MyError('Color was not updated!', 400)
  res.json(updatedColor)
}

export const deleteColor = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const deletedColor = await ColorModel.findByIdAndDelete(id).select('-__v')
  if (!deletedColor) throw new MyError('Color was not deleted!', 404)
  res.json(deletedColor)
}
