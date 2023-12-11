export type Tags = {
  title: string,
  color: string
}

export interface ProductInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: Tags[]
}

export class Product implements ProductInterface {
  id: number;
  name: string;
  price: number;
  description: string;
  tags: Tags[];

  constructor(name: string, price: number, description: string,  tags: Tags[]) {
    this.id = 0;
    this.name = name;
    this.price = price;
    this.description = description;
    this.tags = [];
  }
}
