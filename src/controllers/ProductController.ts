import { db } from "@/services/DbService";

class ProductController implements Controller {
  path = "/product";
  services = new Map<string, Service>();
  constructor() {
    this.services.set("db", db);
  }
}
