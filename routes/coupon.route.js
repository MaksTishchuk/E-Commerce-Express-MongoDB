import {Router} from "express"
import {
  createCoupon, getCoupon, getAllCoupons, updateCoupon, deleteCoupon
} from '../controller/coupon.controller.js'
import {tryCatch} from "../utils/tryCatch.js";
import {authMiddleware, isAdmin} from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/', authMiddleware, isAdmin, tryCatch(createCoupon))
router.get('/', tryCatch(getAllCoupons))
router.get('/:id', tryCatch(getCoupon))
router.put('/:id', authMiddleware, isAdmin, tryCatch(updateCoupon))
router.delete('/:id', authMiddleware, isAdmin, tryCatch(deleteCoupon))

export default router