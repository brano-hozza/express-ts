import { Service } from '@/interfaces/service';
import { Product, ProductDto } from '@/types/product';

export class DbService implements Service {
  private db: Product[] = [];
  name = 'db_service';

  clearDb() {
    this.db = [];
  }

  addProduct(product: ProductDto) {
    if (this.db.find(pr => pr.name === product.name)) {
      throw Error('EXISTS');
    }
    this.db.push({
      id: this.db.length,
      ...product,
    });
  }

  getProduct(id: number) {
    const product = this.db.find(pr => pr.id === id);
    if (!product) {
      throw Error('NO_PRODUCT');
    }
    return product;
  }

  getAll() {
    return this.db;
  }

  updateProduct(id: number, productData: ProductDto) {
    const product = this.db.find(pr => pr.id === id);
    if (!product) {
      throw Error('NO_PRODUCT');
    }
    product.name = productData.name ?? product.name;
    product.description = productData.description ?? product.description;
    product.img ??= productData.img ?? product.img;
  }

  deleteProduct(id: number) {
    const productIndex = this.db.findIndex(pr => pr.id === id);
    if (productIndex === -1) {
      throw Error('NO_PRODUCT');
    }
    this.db.splice(productIndex, 1);
  }
}
