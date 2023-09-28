import jwt from 'jsonwebtoken'

export const generateRefreshToken = (id, username, email, role) => {
  return jwt.sign({id, username, email, role}, process.env.SECRET_JWT, {expiresIn: '7d'})
}

