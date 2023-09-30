import {Router} from "express"
import {
  createBrand, getBrand, getAllBrands, updateBrand, deleteBrand
} from '../controller/brand.controller.js'
import {tryCatch} from "../utils/tryCatch.js";
import {authMiddleware, isAdmin} from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/', authMiddleware, isAdmin, tryCatch(createBrand))
router.get('/', tryCatch(getAllBrands))
router.get('/:id', tryCatch(getBrand))
router.put('/:id', authMiddleware, isAdmin, tryCatch(updateBrand))
router.delete('/:id', authMiddleware, isAdmin, tryCatch(deleteBrand))

export default router