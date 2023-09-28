import ProductModel from '../models/product.model.js'
import {MyError} from "../exceptions/myError.js"
import {validateMongoId} from "../utils/validateMongoId.js"
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
  const findProducts = await ProductModel.find({}, {__v: 0})
  res.json(findProducts)
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
