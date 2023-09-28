import {MyError} from "../exceptions/myError.js";

export const ErrorMiddleware = (error, req, res, next) => {
  console.log(error)
  if (error.name === "ValidationError") {
    return res.status(400).send({
      status: 400,
      type: "ValidationError",
      details: error.errors
    })
  }
  if (error instanceof MyError) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message
    })
  }
  if (error.code === 11000) {
    return res.status(500).json({
      status: 500,
      message: 'Duplicate value in unique field',
      field: error.keyValue
    })
  }
  return res.status(500).json({
    status: 500,
    message: error.message
  })
}