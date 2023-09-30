import {Router} from "express"
import {
  createBlog, getBlog, getAllBlogs, updateBlog, deleteBlog, likeBlog, dislikeBlog
} from '../controller/blog.controller.js'
import {tryCatch} from "../utils/tryCatch.js";
import {authMiddleware, isAdmin} from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/', authMiddleware, isAdmin, tryCatch(createBlog))
router.get('/', tryCatch(getAllBlogs))
router.get('/:id', tryCatch(getBlog))
router.put('/:id', authMiddleware, isAdmin, tryCatch(updateBlog))
router.delete('/:id', authMiddleware, isAdmin, tryCatch(deleteBlog))
router.post('/like', authMiddleware, tryCatch(likeBlog))
router.post('/dislike', authMiddleware, tryCatch(dislikeBlog))

export default router