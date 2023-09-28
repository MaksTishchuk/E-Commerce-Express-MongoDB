import {Router} from "express"
import {register, login, logout, refreshToken} from '../controller/auth.controller.js'
import {tryCatch} from "../utils/tryCatch.js";

const router = Router()

router.post('/register', tryCatch(register))
router.post('/login', tryCatch(login))
router.get('/logout', tryCatch(logout))
router.get('/refresh-token', tryCatch(refreshToken))

export default router