import { Router } from "express";
import { hallo, profile, login, allUser, transfer } from "../controllers/userController";
import { transferSchema } from "../validation/transferSchema";
import { validate } from "../middlewares/validate";
import { authorizationRole } from "../middlewares/authorrizerRole";
import { authentication } from "../middlewares/authMidelware";

const router = Router();

router.get('/users', authentication, authorizationRole(['ADMIN']), allUser)
router.get('/sapa', hallo);
router.get('/:name', profile);
router.post('/tf', validate(transferSchema), transfer);
router.post('/login', login);


export default router;