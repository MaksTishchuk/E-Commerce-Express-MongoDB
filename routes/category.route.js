import {Router} from "express"
import {
  createCategory, getCategory, getAllCategories, updateCategory, deleteCategory
} from '../controller/category.controller.js'
import {tryCatch} from "../utils/tryCatch.js";
import {authMiddleware, isAdmin} from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/', authMiddleware, isAdmin, tryCatch(createCategory))
router.get('/', tryCatch(getAllCategories))
router.get('/:id', tryCatch(getCategory))
router.put('/:id', authMiddleware, isAdmin, tryCatch(updateCategory))
router.delete('/:id', authMiddleware, isAdmin, tryCatch(deleteCategory))


export default router