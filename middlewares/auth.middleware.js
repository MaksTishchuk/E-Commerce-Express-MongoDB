import UserModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import {MyError} from "../exceptions/myError.js";

export const authMiddleware = async (req, res, next) => {
  try {
    let token
    if (req?.headers?.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
      if (token) {
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        const user = await UserModel.findById(decoded?.id)
        req.user = user
        next()
      } else throw new MyError('Unauthorized!', 401)
    } else {
      throw new MyError('Unauthorized!', 401)
    }
  } catch (error) {
    return next(error)
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') throw new MyError('Forbidden!', 403)
    next()
  } catch (error) {
    return next(error)
  }
}
