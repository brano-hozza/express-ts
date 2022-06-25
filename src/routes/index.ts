import { ProductController } from '@/controllers/ProductController';
import { Router } from 'express';

export class ProductRouter {
  productController = new ProductController();
  constructor(app: Router) {
    this.initializeRoutes(app);
  }
  initializeRoutes(app: Router) {
    /**
     * Get all products
     * @method get
     */
    app.get('/products', this.productController.getAllProducts.bind(this.productController));

    /**
     * Get single product
     * @method get
     * @param {number} id -> id of product
     */
    app.get('/product/:id', this.productController.getSingleProduct.bind(this.productController));

    /**
     * Delete single product
     * @method delete
     * @param {number} id -> id of product
     */
    app.delete('/product/:id', this.productController.removeProduct.bind(this.productController));

    /**
     * Delete all products
     * @method delete
     */
    app.delete('/products', this.productController.removeAllProducts.bind(this.productController));

    /**
     * Create product
     * @method post
     * @param {string} name -> unique product name
     * @param {string} description -> product description
     * @param {string} img -> URL for product image
     */
    app.post('/product', this.productController.registerProduct.bind(this.productController));

    /**
     * Update product
     * @method put
     * @param {string} name -> unique product name
     * @param {string} description -> product description
     * @param {string} img -> URL for product image
     */
    app.put('/product/:id', this.productController.updateProduct.bind(this.productController));
  }
}
