import {Router} from "express"
import {register, login} from '../controller/auth.controller.js'
import {tryCatch} from "../utils/tryCatch.js";

const router = Router()

router.post('/register', tryCatch(register))
router.post('/login', tryCatch(login))

export default router