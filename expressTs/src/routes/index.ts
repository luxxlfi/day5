import { Router } from "express";
import userRout from './userRout';
import productRoute from './productRoute';
import authRoute from './autrhRoute';


const router = Router();

router.use('/profile', userRout);
router.use('/products', productRoute);
router.use('/auth', authRoute);

export default router;