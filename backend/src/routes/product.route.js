import Router from 'express';
import {createProduct,getAllProducts} from '../controllers/product.controller.js'
import {requireAuth,authRole} from '../middleware/auth.js'
const route = Router();

route.get("/",getAllProducts);
route.post("/",requireAuth,authRole("admin"),createProduct);

export default ProductRoute = route;