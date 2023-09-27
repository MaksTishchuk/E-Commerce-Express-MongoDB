import UserModel from '../models/user.model.js'
import {MyError} from "../exceptions/myError.js"
import {validateMongoId} from "../utils/validateMongoId.js"

export const getAllUsers = async (req, res) => {
  const users = await UserModel.find({}, {password: 0, __v: 0})
  res.json(users)
}

export const getUser = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const findUser = await UserModel.findOne({_id: id}, {password: 0, __v: 0})
  if (!findUser) throw new MyError('User was not found!', 404)
  res.json(findUser)
}

export const updateUser = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const updatedUser = await UserModel.findByIdAndUpdate(id, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mobile: req.body.mobile,
    address: req.body.address
  }, {new: true}).select('-password -__v')
  if (!updatedUser) throw new MyError('User was not updated!', 400)
  res.json(updatedUser)
}

export const blockUser = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const findUser = await UserModel.findOne({_id: id}, {password: 0, __v: 0})
  if (!findUser) throw new MyError('User was not found!', 404)
  const updatedUser = await UserModel.findByIdAndUpdate(id, {
    isBlocked: !findUser.isBlocked
  }, {new: true}).select('-password -__v')
  if (!updatedUser) throw new MyError('User was not updated!', 400)
  res.json({success: true, isBlocked: updatedUser.isBlocked})
}

export const deleteUser = async (req, res) => {
  const {id} = req.params
  validateMongoId(id)
  const deletedUser = await UserModel.findByIdAndDelete(id).select('-password -__v')
  if (!deletedUser) throw new MyError('User was not found!', 404)
  res.json(deletedUser)
}

export const myProfile = async (req, res) => {
  validateMongoId(req.user._id)
  const findUser = await UserModel.findOne({_id: req.user._id}, {password: 0, __v: 0})
  if (!findUser)  throw new MyError('User was not found!', 404)
  res.json(findUser)
}

export const updateProfile = async (req, res) => {
  const id = req.user._id
  validateMongoId(id)
  const updatedUser = await UserModel.findByIdAndUpdate(id, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mobile: req.body.mobile,
    address: req.body.address
  }, {new: true}).select('-password -__v')
  if (!updatedUser)  throw new MyError('User was not updated!', 400)
  res.json(updatedUser)
}
