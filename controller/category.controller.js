import CategoryModel from '../models/category.model.js'
import {MyError} from "../exceptions/myError.js"
import {validateMongoId} from "../utils/validateMongoId.js"

export const createCategory = async (req, res) => {
  const newCategory = await CategoryModel.create({...req.body})
  res.json(newCategory)
}

export const getCategory = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const findCategory = await CategoryModel.findById(id).select('-__v')
  if (!findCategory) throw new MyError('Category was not found!', 404)
  res.json(findCategory)
}

export const getAllCategories = async (req, res) => {
  const categories = await CategoryModel.find({}, {__v: 0}).sort('-createdAt')
  res.json(categories)
}

export const updateCategory = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const updatedCategory = await CategoryModel.findByIdAndUpdate(id, req.body, {new: true}).select('-__v')
  if (!updatedCategory) throw new MyError('Category was not updated!', 400)
  res.json(updatedCategory)
}

export const deleteCategory = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const deletedCategory = await CategoryModel.findByIdAndDelete(id).select('-__v')
  if (!deletedCategory) throw new MyError('Category was not deleted!', 404)
  res.json(deletedCategory)
}
