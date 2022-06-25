import { DbService } from '@/services/DbService';
import { Request, Response, Router } from 'express';

export class ProductController implements Controller {
  private dbService: DbService;

  constructor(app: Router) {
    this.dbService = new DbService();
    this.initializeRoutes(app);
  }

  initializeRoutes(app: Router) {
    console.log(this);
    /**
     * Get all products
     * @method get
     */
    app.get('/products', this.getAllProducts.bind(this));

    /**
     * Get single product
     * @method get
     * @param {number} id -> id of product
     */
    app.get('/product/:id', this.getSingleProduct.bind(this));

    /**
     * Delete single product
     * @method delete
     * @param {number} id -> id of product
     */
    app.delete('/product/:id', this.removeProduct.bind(this));

    /**
     * Create product
     * @method post
     * @param {string} name -> unique product name
     * @param {string} description -> product description
     * @param {string} img -> URL for product image
     */
    app.post('/product', this.registerProduct.bind(this));

    /**
     * Update product
     * @method put
     * @param {string} name -> unique product name
     * @param {string} description -> product description
     * @param {string} img -> URL for product image
     */
    app.put('/product/:id', this.updateProduct.bind(this));
  }

  getAllProducts(req: Request, res: Response) {
    console.log(this.dbService);
    return res.json(this.dbService.getAll());
  }

  getSingleProduct(req: Request, res: Response) {
    const productID = Number(req.params['id']);
    try {
      const product = this.dbService.getProduct(productID);
      return res.json(product);
    } catch (err) {
      if (err.name === 'NO_PRODUCT') {
        return res.status(404).send("This product doesn't exists");
      } else {
        return res.status(500).send(err);
      }
    }
  }

  registerProduct(req: Request, res: Response) {
    const productData = req.body as ProductDto;
    try {
      this.dbService.addProduct(productData);
      return res.send('Product successfully created');
    } catch (err) {
      if (err.name === 'EXISTS') {
        return res.status(409).send('Product with that name already exists');
      }
    }
  }

  updateProduct(req: Request, res: Response) {
    const productData = req.body as ProductDto;
    const productID = Number(req.params['id']);
    try {
      this.dbService.updateProduct(productID, productData);
      return res.send('Product successfully updated');
    } catch (err) {
      if (err.name === 'NO_PRODUCT') {
        return res.status(404).send("This product doesn't exists");
      }
    }
  }

  removeProduct(req: Request, res: Response) {
    const productID = Number(req.params['id']);
    try {
      this.dbService.deleteProduct(productID);
      return res.send('Product successfully deleted');
    } catch (err) {
      if (err.name === 'NO_PRODUCT') {
        return res.status(404).send("This product doesn't exists");
      }
    }
  }
}
