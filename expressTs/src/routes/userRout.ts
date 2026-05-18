import { Router } from "express";
import { hallo, profile, login, allUser, transfer } from "../controllers/userController";
import { transferSchema } from "../validation/transferSchema";
import { validate } from "../middlewares/validate";

const router = Router();

router.get('/users', allUser)
router.get('/sapa', hallo);
router.get('/:name', profile);
router.post('/tf',validate(transferSchema), transfer);
router.post('/login', login);


export default router;