import UserModel from '../models/user.model.js'
import {MyError} from "../exceptions/myError.js";

export const register = async (req, res, next) => {
  const email = req.body.email
  const findUser = await UserModel.findOne({email})
  if (findUser) throw new MyError('User already exists', 400)
  const newUser = await UserModel.create(req.body)
  res.json(newUser)
}
