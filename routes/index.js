import {Router} from "express"
import authRouter from './auth.route.js'
import userRouter from './user.route.js'
import productRouter from './product.route.js'
import blogRouter from './blog.route.js'
import categoriesRouter from './category.route.js'
import blogCategoriesRouter from './blog-category.route.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/blog', blogRouter)
router.use('/categories', categoriesRouter)
router.use('/blog-categories', blogCategoriesRouter)

export default router
