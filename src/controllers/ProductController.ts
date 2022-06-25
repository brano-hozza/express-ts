import { Controller } from '@/interfaces/controller';
import { DbService } from '@/services/DbService';
import { ProductDto } from '@/types/product';
import { Request, Response } from 'express';

export class ProductController implements Controller {
  name = 'product_controller';
  private dbService = new DbService();

  getAllProducts(req: Request, res: Response) {
    return res.json(this.dbService.getAll());
  }

  getSingleProduct(req: Request, res: Response) {
    const productID = Number(req.params['id']);
    try {
      const product = this.dbService.getProduct(productID);
      return res.json(product);
    } catch (err) {
      if (err.message === 'NO_PRODUCT') {
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
      if (err.message === 'EXISTS') {
        return res.status(409).send('Product with that name already exists');
      } else {
        return res.status(500).send(err);
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
      if (err.message === 'NO_PRODUCT') {
        return res.status(404).send("This product doesn't exists");
      } else {
        return res.status(500).send(err);
      }
    }
  }

  removeProduct(req: Request, res: Response) {
    const productID = Number(req.params['id']);
    try {
      this.dbService.deleteProduct(productID);
      return res.send('Product successfully deleted');
    } catch (err) {
      if (err.message === 'NO_PRODUCT') {
        return res.status(404).send("This product doesn't exists");
      } else {
        return res.status(500).send(err);
      }
    }
  }
  //remove all products
  removeAllProducts(req: Request, res: Response) {
    this.dbService.clearDb();
    return res.send('All products successfully deleted');
  }
}
