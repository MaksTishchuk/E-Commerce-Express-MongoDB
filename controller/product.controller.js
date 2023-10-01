import ProductModel from '../models/product.model.js'
import UserModel from '../models/user.model.js'
import {MyError} from "../exceptions/myError.js"
import {validateMongoId} from "../utils/validateMongoId.js"
import {pagination} from "../utils/pagination.js"
import slugify from "slugify";

export const createProduct = async (req, res) => {
  const newProduct = await ProductModel.create({...req.body, slug: slugify(req.body.title)})
  res.json(newProduct)
}

export const getProduct = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const findProduct = await ProductModel.findById(id, {__v: 0})
  if (!findProduct) throw new MyError('Product was not found!', 404)
  res.json(findProduct)
}

export const getAllProducts = async (req, res) => {
  const queryObject = {...req.query}
  const excludeFields = ['page', 'sort', 'limit', 'fields', 'search']
  excludeFields.forEach((el) => delete queryObject[el])
  let queryStr = JSON.stringify(queryObject)
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
  const parsedString = JSON.parse(queryStr)

  // Search
  if (req.query.search) parsedString.title = {$regex: req.query.search, $options: 'i'}

  let query = ProductModel.find(parsedString)

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  } else query = query.sort('-createdAt')

  // Fields limit
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ')
    query = query.select(fields)
  } else query = query.select('-__v')

  // Pagination
  const {limit, skip} = pagination(req.query.page, req.query.limit)
  query = query.skip(skip).limit(limit)
  const productsCount = await ProductModel.countDocuments()
  if (skip >= productsCount) throw new MyError('Page does not exists!', 404)
  const products = await query
  res.json({productsCount, products})
}

export const updateProduct = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const findProduct = await ProductModel.findOne({_id: id}, {__v: 0})
  if (!findProduct) throw new MyError('Product was not found!', 404)
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, {
    ...req.body, slug: req.body.title ? slugify(req.body.title) : findProduct.slug
  }, {new: true})
  if (!updatedProduct) throw new MyError('Product was not updated!', 400)
  res.json(updatedProduct)
}

export const deleteProduct = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const deletedProduct = await ProductModel.findByIdAndDelete(id).select('-__v')
  if (!deletedProduct) throw new MyError('Product was not deleted!', 404)
  res.json(deletedProduct)
}

export const addToWishList = async (req, res) => {
  const id = req.user.id
  validateMongoId(id)
  const productId = req.body.productId
  validateMongoId(productId)
  let user = await UserModel.findById(id)
  if (!user) throw new MyError('User was not found!', 404)
  const alreadyAdded = user.wishlist.find((id) => id.toString() === productId)
  if (alreadyAdded) {
    user = await UserModel.findByIdAndUpdate(id, {
      $pull: {wishlist: productId}
    }, {new: true}).populate('wishlist')
  } else {
    user = await UserModel.findByIdAndUpdate(id, {
      $push: {wishlist: productId}
    }, {new: true}).populate('wishlist')
  }
  return res.json(user)
}
