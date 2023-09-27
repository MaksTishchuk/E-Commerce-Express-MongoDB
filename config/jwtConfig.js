import jwt from 'jsonwebtoken'

export const generateToken = (id, username, email, role) => {
  return jwt.sign({id, username, email, role}, process.env.SECRET_JWT, {expiresIn: '1d'})
}

