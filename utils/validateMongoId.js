import mongoose from 'mongoose'
import {MyError} from "../exceptions/myError.js";

export const validateMongoId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id)
  if (!isValid) throw new MyError('Invalid id!', 400)
}