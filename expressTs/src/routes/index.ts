import { Router } from "express";
import userRout from './userRout';
import productRoute from './productRoute';


const router = Router();

router.use('/profile', userRout);
router.use('/products', productRoute);

export default router;