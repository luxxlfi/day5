import { Router } from "express";
import { createProduct, getAllproduct, getProductbyId, updateProduct, deleteProduct } from "../controllers/productControler";
import { validate } from "../middlewares/validate";
import { createProductSchema } from "../validation/productSchema";
const router = Router();

router.post('/',validate(createProductSchema), createProduct);
router.get('/', getAllproduct);
router.get('/:id', getProductbyId);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;