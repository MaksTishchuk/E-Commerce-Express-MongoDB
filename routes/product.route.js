import {Router} from "express"
import {
  createProduct, getProduct, getAllProducts, updateProduct, deleteProduct, addToWishList
} from '../controller/product.controller.js'
import {tryCatch} from "../utils/tryCatch.js";
import {authMiddleware, isAdmin} from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/', authMiddleware, isAdmin, tryCatch(createProduct))
router.get('/', tryCatch(getAllProducts))
router.get('/:id', tryCatch(getProduct))
router.put('/:id', authMiddleware, isAdmin, tryCatch(updateProduct))
router.delete('/:id', authMiddleware, isAdmin, tryCatch(deleteProduct))
router.patch('/add-to-wish-list', authMiddleware, tryCatch(addToWishList))

export default router