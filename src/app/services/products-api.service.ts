import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of, map } from 'rxjs';
import { ProductInterface } from '../products/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private readonly apiUrl = '../assets/products.json';

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.apiUrl);
  }

  public addProduct(product: ProductInterface): Observable<ProductInterface[]> {
    return this.getProducts().pipe(
      tap((products) => {
        const maxId = Math.max(...products.map((a) => a.id), 0);
        product.id = maxId + 1;
        products.push(product);
      })
    );
  }

  updateArticle(id: number, product: ProductInterface): Observable<ProductInterface[]> {
    return this.getProducts()
      .pipe(
        tap(products => {
          const index = products.findIndex(a => a.id === id);
          if (index !== -1) {
            products[index] = { ...product, id };
          }
        })
      );
  }

  deleteArticle(id: number): Observable<ProductInterface[]> {
    return this.getProducts()
      .pipe(
        tap(products => {
          const index = products.findIndex(a => a.id === id);
          if (index !== -1) {
            products.splice(index, 1);
          }
        })
      );
  }
}
