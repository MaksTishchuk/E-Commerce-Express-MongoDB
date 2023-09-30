import {Router} from "express"
import {
  createBlogCategory, getBlogCategory, getAllBlogCategories, updateBlogCategory, deleteBlogCategory
} from '../controller/blog-category.controller.js'
import {tryCatch} from "../utils/tryCatch.js";
import {authMiddleware, isAdmin} from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/', authMiddleware, isAdmin, tryCatch(createBlogCategory))
router.get('/', tryCatch(getAllBlogCategories))
router.get('/:id', tryCatch(getBlogCategory))
router.put('/:id', authMiddleware, isAdmin, tryCatch(updateBlogCategory))
router.delete('/:id', authMiddleware, isAdmin, tryCatch(deleteBlogCategory))


export default router