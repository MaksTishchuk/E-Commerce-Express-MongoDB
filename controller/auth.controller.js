import UserModel from '../models/user.model.js'
import {MyError} from "../exceptions/myError.js";
import {generateToken} from "../config/jwtConfig.js"

export const register = async (req, res) => {
  const email = req.body.email
  const findUser = await UserModel.findOne({email})
  if (findUser) throw new MyError('User already exists!', 400)
  const newUser = await UserModel.create(req.body)
  res.json({
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    token: generateToken(newUser.id, newUser.username, newUser.email, newUser.role)
  })
}

export const login = async (req, res) => {
  const {email, password} = req.body
  const findUser = await UserModel.findOne({email})
  if (findUser && await findUser.isPasswordMatched(password)) {
    res.json({
      id: findUser._id,
      username: findUser.username,
      email: findUser.email,
      token: generateToken(findUser._id, findUser.username, findUser.email, findUser.role)
    })
  } else {
    throw new MyError('Invalid credentials!', 404)
  }
}
