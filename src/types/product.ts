export interface ProductDto {
  name: string;
  description: string;
  img: string;
}
export interface Product extends ProductDto {
  id: number;
}
