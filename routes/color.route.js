import {Router} from "express"
import {
  createColor, getColor, getAllColors, updateColor, deleteColor
} from '../controller/color.controller.js'
import {tryCatch} from "../utils/tryCatch.js";
import {authMiddleware, isAdmin} from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/', authMiddleware, isAdmin, tryCatch(createColor))
router.get('/', tryCatch(getAllColors))
router.get('/:id', tryCatch(getColor))
router.put('/:id', authMiddleware, isAdmin, tryCatch(updateColor))
router.delete('/:id', authMiddleware, isAdmin, tryCatch(deleteColor))

export default router