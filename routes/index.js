import {Router} from "express"
import authRouter from './auth.route.js'
import userRouter from './user.route.js'
import productRouter from './product.route.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/products', productRouter)

export default router
