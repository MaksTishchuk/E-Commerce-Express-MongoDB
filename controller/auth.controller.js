import UserModel from '../models/user.model.js'
import {MyError} from "../exceptions/myError.js";
import {generateToken} from "../config/jwtConfig.js"
import {generateRefreshToken} from "../config/jwRefreshConfig.js"
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const email = req.body.email
  const findUser = await UserModel.findOne({email})
  if (findUser) throw new MyError('User already exists!', 400)
  const newUser = await UserModel.create(req.body)
  const refreshToken = await generateRefreshToken(newUser.id, newUser.username, newUser.email, newUser.role)
  await UserModel.findByIdAndUpdate(newUser.id, {refreshToken})
  res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 168 * 60 * 60 * 1000})
  res.json({
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    accessToken: generateToken(newUser.id, newUser.username, newUser.email, newUser.role)
  })
}

export const login = async (req, res) => {
  const {email, password} = req.body
  const findUser = await UserModel.findOne({email})
  if (findUser && await findUser.isPasswordMatched(password)) {
    const refreshToken = await generateRefreshToken(findUser.id, findUser.username, findUser.email, findUser.role)
    await UserModel.findByIdAndUpdate(findUser.id, {refreshToken})
    res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 168 * 60 * 60 * 1000})
    res.json({
      id: findUser.id,
      username: findUser.username,
      email: findUser.email,
      accessToken: generateToken(findUser.id, findUser.username, findUser.email, findUser.role)
    })
  } else {
    throw new MyError('Invalid credentials!', 404)
  }
}

export const logout = async (req, res) => {
  if (!req.cookies?.refreshToken) throw new MyError('No refresh token in Cookies!', 400)
  const refreshToken = req.cookies.refreshToken
  const user = await UserModel.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true
    })
    return res.sendStatus(204)
  }
  await UserModel.findOneAndUpdate({refreshToken}, {
    refreshToken: "",
  })
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  })
  res.sendStatus(204)
}

export const refreshToken = async (req, res) => {
  if (!req.cookies?.refreshToken) throw new MyError('No refresh token in Cookies!', 400)
  const refreshToken = req.cookies.refreshToken
  const user = await UserModel.findOne({refreshToken})
  if (!user) throw new MyError('No match refresh token in database!', 404)
  jwt.verify(refreshToken, process.env.SECRET_JWT, (err, decoded) => {
    if (err || user.id !== decoded.id) throw new MyError('There is something wrong with refresh token!', 400)
    res.json({accessToken: generateToken(user.id, user.username, user.email, user.role)})
  })
}
