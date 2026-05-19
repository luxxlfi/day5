import { Router } from "express";
import { createProduct, getAllproduct, getProductbyId, updateProduct, deleteProduct } from "../controllers/productControler";
import { validate } from "../middlewares/validate";
import { createProductSchema } from "../validation/productSchema";
import { authentication } from "../middlewares/authMidelware";
import { authorizationRole } from "../middlewares/authorrizerRole";
import { upload } from "../lib/multer";
const router = Router();

router.post('/', authentication, upload.single(`image`), validate(createProductSchema), createProduct);
router.get('/', authentication, authorizationRole(['ADMIN']), getAllproduct);
router.get('/:id', getProductbyId);
router.put('/:id', updateProduct);
router.delete('/:id', authentication, authorizationRole(['ADMIN']), deleteProduct);

export default router;
