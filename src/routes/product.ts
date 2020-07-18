import { Router } from "express";
import { productController } from "../controllers/product";


const productRoutes = Router();
productRoutes.get('/:id', productController.getProduct);
productRoutes.get('/', productController.listProducts);
productRoutes.post('/', productController.insertProduct);
productRoutes.put('/:id', productController.updateProduct);
productRoutes.delete('/:id', productController.deleteProduct);

export { 
    productRoutes
}