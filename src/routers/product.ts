import { ProductController } from "@controllers";
import {Router} from "express";

const router = Router();

router.get('/product', ProductController.getProduct)

export default router;