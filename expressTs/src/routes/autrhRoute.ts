import { Router } from "express";
import { register, Userlogin } from "../controllers/authControler";
import { upload } from "../lib/multer";

const router = Router();

router.post('/register', upload.single(`image`), register)
router.post('/Ulogin', Userlogin)

export default router;