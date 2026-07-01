import Router from 'express';
import {createProduct,getAllProducts, updateProduct,deleteProduct} from '../controllers/product.controller.js'
import {requireAuth,authRole} from '../middleware/auth.js'

export const ProductRoute = Router();
const route =ProductRoute;

route.get("/",getAllProducts);
route.post("/",requireAuth,authRole("admin"),createProduct);
route.put("/:id",requireAuth,authRole("admin"),updateProduct);
route.delete("/:id",requireAuth,authRole("admin"),deleteProduct);

