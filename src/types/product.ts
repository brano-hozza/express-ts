interface ProductDto {
  name: string;
  description: string;
  img: string;
}
interface Product extends ProductDto {
  id: number;
}
