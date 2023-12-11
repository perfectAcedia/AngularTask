import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductInterface } from '../products/product.model';

const productsAPI: ProductInterface[] = [
  {
    id: 1,
    name: 'The Coding Maestro',
    price: 123,
    description:
      'Unleash your programming skills with this masterclass. Dive deep into algorithms, data structures, and elegant code.',
    tags: [
      { title: 'programming', color: '#3498db' },
      { title: 'JavaScript', color: '#f39c12' },
      { title: 'web development', color: '#2ecc71' },
    ],
  },
  {
    id: 2,
    name: 'Crafting TypeScript Magic',
    price: 123,
    description:
      'Explore the wonders of TypeScript and build robust, scalable applications. Elevate your frontend development game.',
    tags: [
      { title: 'coding', color: '#e74c3c' },
      { title: 'TypeScript', color: '#9b59b6' },
      { title: 'frontend', color: '#1abc9c' },
    ],
  },
  {
    id: 3,
    name: 'Node.js Ninja Handbook',
    price: 150,
    description:
      'Master the art of server-side scripting with Node.js. Learn to build scalable and high-performance backend applications.',
    tags: [
      { title: 'backend', color: '#34495e' },
      { title: 'Node.js', color: '#2c3e50' },
      { title: 'database', color: '#e67e22' },
    ],
  },
  {
    id: 4,
    name: 'Pythonic Data Science',
    price: 200,
    description:
      'Embark on a journey into the realm of data science with Python. Uncover patterns, analyze data, and make insightful decisions.',
    tags: [
      { title: 'programming', color: '#3498db' },
      { title: 'Python', color: '#27ae60' },
      { title: 'data science', color: '#d35400' },
    ],
  },
  {
    id: 5,
    name: "Java Architect's Blueprint",
    price: 100,
    description:
      'Architect software solutions like a pro with Java. Dive deep into software engineering principles and design scalable systems.',
    tags: [
      { title: 'coding', color: '#e74c3c' },
      { title: 'Java', color: '#3498db' },
      { title: 'software engineering', color: '#8e44ad' },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _products$: BehaviorSubject<ProductInterface[]> =
    new BehaviorSubject<ProductInterface[]>(productsAPI);
  public readonly products$ = this._products$.asObservable();

  constructor() {}

  get products(): ProductInterface[] {
    return this._products$.getValue();
  }

  private set products(products: ProductInterface[]) {
    this._products$.next(products);
  }

  public getProducts(): ProductInterface[] {
    return this.products;
  }

  public setProducts(products: ProductInterface[]): void {
    this.products = products;
  }

  public createProduct(newProduct: ProductInterface): void {
    this.products = [...this.products, newProduct];
  }

  public updateProduct(newProduct: ProductInterface): void {
    const productForUpdate = this.products.find(
      (product) => product.id === newProduct.id
    );

    Object.assign(productForUpdate as ProductInterface, newProduct);
  }

  public removeProduct(id: number): void {
    this.products = this.products.filter((product) => product.id !== id);
    console.log(this.products);
  }

  public getProductById(id: number): ProductInterface | undefined {
    return this.products.find((product) => product.id === id);
  }

  public maxId(): number {
    return Math.max(...this.products.map(product => product.id));
  }
}
