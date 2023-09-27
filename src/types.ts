export type ICategory = {
  id: number;
  name: string;
  preview: any;
};
export type IProduct = {
  id: number;
  name: string;
  preview: any;
  images?: any[];
  description?: string;
  price: number;
  priceBTC?: number;
  date?: any;
  status?: any;
};
