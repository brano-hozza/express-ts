import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { authMiddleware } from "./middlewares/auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use(authMiddleware);

const db: Product[] = [];
/**
 * Get all products
 * @method get
 */
app.get("/products", (req: Request, res: Response) => {
  return res.json(db);
});

/**
 * Get single product
 * @method get
 * @param {number} id -> id of product
 */
app.get("/product/:id", (req: Request, res: Response) => {
  const productID = Number(req.params["id"]);
  const product = db.find((pr) => pr.id === productID);
  if (!product) {
    return res.status(404).send("This product doesn't exists");
  }
  return res.json(product);
});

/**
 * Delete single product
 * @method delete
 * @param {number} id -> id of product
 */
app.delete("/product/:id", (req: Request, res: Response) => {
  const productID = Number(req.params["id"]);
  if (!db.find((pr) => pr.id === productID)) {
    return res.status(404).send("This product doesn't exists");
  }
  db.splice(
    db.findIndex((pr) => pr.id === productID),
    1
  );
  return res.send("Product successfully deleted");
});

/**
 * Create product
 * @method post
 * @param {string} name -> unique product name
 * @param {string} description -> product description
 * @param {string} img -> URL for product image
 */
app.post("/product", (req: Request, res: Response) => {
  const productData = req.body as ProductDto;
  if (db.find((pr) => pr.name === productData.name)) {
    return res.status(409).send("Product with that name already exists");
  }
  db.push({
    id: db.length,
    ...productData,
  });
  return res.send("Product successfully created");
});

/**
 * Update product
 * @method put
 * @param {string} name -> unique product name
 * @param {string} description -> product description
 * @param {string} img -> URL for product image
 */
app.put("/product/:id", (req: Request, res: Response) => {
  const productData = req.body as ProductDto;
  const productID = Number(req.params["id"]);
  let product = db.find((pr) => pr.id === productID);
  if (!product) {
    return res.status(404).send("This product doesn't exists");
  }
  product.name = productData.name ?? product.name;
  product.description = productData.description ?? product.description;
  product.img ??= productData.img ?? product.img;
  return res.send("Product successfully updated");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
