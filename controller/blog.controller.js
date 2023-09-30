import BlogModel from '../models/blog.model.js'
import UserModel from '../models/user.model.js'
import {MyError} from "../exceptions/myError.js"
import {validateMongoId} from "../utils/validateMongoId.js"
import {pagination} from "../utils/pagination.js";

export const createBlog = async (req, res) => {
  const newBlog = await BlogModel.create({...req.body})
  res.json(newBlog)
}

export const getBlog = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const findBlog = await BlogModel.findByIdAndUpdate(
    id,
    {$inc: {numViews: 1}},
    {new: true}
  ).populate("likes").populate("dislikes").select('-__v')
  if (!findBlog) throw new MyError('Blog was not found!', 404)
  res.json(findBlog)
}

export const getAllBlogs = async (req, res) => {
  const {limit, skip} = pagination(req.query.page, req.query.limit)
  const blogs = await BlogModel.find({}, {__v: 0}).sort('-createdAt').limit(limit).skip(skip)
  res.json(blogs)
}

export const updateBlog = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const updatedBlog = await BlogModel.findByIdAndUpdate(id, req.body, {new: true}).select('-__v')
  if (!updatedBlog) throw new MyError('Blog was not updated!', 400)
  res.json(updatedBlog)
}

export const deleteBlog = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const deletedBlog = await BlogModel.findByIdAndDelete(id).select('-__v')
  if (!deletedBlog) throw new MyError('Blog was not deleted!', 404)
  res.json(deletedBlog)
}

export const likeBlog = async (req, res) => {
  const {id} = req.body
  const userId = req?.user?.id
  validateMongoId(id)
  const blog = await BlogModel.findById(id)
  if (!blog) throw new MyError(`Blog with id "${id}" was not found!`, 404)

  // ADD LOGIC

  res.json()
}

export const dislikeBlog = async (req, res) => {
  const {id} = req.body
  const userId = req?.user?.id
  validateMongoId(id)
  const blog = await BlogModel.findById(id)
  if (!blog) throw new MyError(`Blog with id "${id}" was not found!`, 404)

  // ADD LOGIC

  res.json()
}
