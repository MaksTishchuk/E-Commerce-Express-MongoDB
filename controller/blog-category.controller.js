import BlogCategoryModel from '../models/blog-category.model.js'
import {MyError} from "../exceptions/myError.js"
import {validateMongoId} from "../utils/validateMongoId.js"

export const createBlogCategory = async (req, res) => {
  const newBlogCategory = await BlogCategoryModel.create({...req.body})
  res.json(newBlogCategory)
}

export const getBlogCategory = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const findBlogCategory = await BlogCategoryModel.findById(id).select('-__v')
  if (!findBlogCategory) throw new MyError('Blog Category was not found!', 404)
  res.json(findBlogCategory)
}

export const getAllBlogCategories = async (req, res) => {
  const blogCategories = await BlogCategoryModel.find({}, {__v: 0}).sort('-createdAt')
  res.json(blogCategories)
}

export const updateBlogCategory = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const updatedBlogCategory = await BlogCategoryModel.findByIdAndUpdate(id, req.body, {new: true}).select('-__v')
  if (!updatedBlogCategory) throw new MyError('Blog Category was not updated!', 400)
  res.json(updatedBlogCategory)
}

export const deleteBlogCategory = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const deletedBlogCategory = await BlogCategoryModel.findByIdAndDelete(id).select('-__v')
  if (!deletedBlogCategory) throw new MyError('Blog Category was not deleted!', 404)
  res.json(deletedBlogCategory)
}
