import {Router} from "express"
import {
  getAllUsers, getUser, updateUser, deleteUser, myProfile, updateProfile
} from '../controller/user.controller.js'
import {tryCatch} from "../utils/tryCatch.js";
import {authMiddleware, isAdmin} from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/my-profile', authMiddleware, tryCatch(myProfile))
router.put('/my-profile', authMiddleware, tryCatch(updateProfile))
router.get('/', tryCatch(getAllUsers))
router.get('/:id', tryCatch(getUser))
router.put('/:id', authMiddleware, isAdmin, tryCatch(updateUser))
router.delete('/:id', authMiddleware, isAdmin, tryCatch(deleteUser))

export default router