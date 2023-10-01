import {Router} from "express"
import authRouter from './auth.route.js'
import userRouter from './user.route.js'
import productRouter from './product.route.js'
import blogRouter from './blog.route.js'
import categoriesRouter from './category.route.js'
import blogCategoriesRouter from './blog-category.route.js'
import brandRouter from './brand.route.js'
import colorRouter from './color.route.js'
import couponRouter from './coupon.route.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/blog', blogRouter)
router.use('/categories', categoriesRouter)
router.use('/blog-categories', blogCategoriesRouter)
router.use('/brands', brandRouter)
router.use('/colors', colorRouter)
router.use('/coupons', couponRouter)

export default router
