import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ProductInterface } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  public products$: ProductInterface[] = [];
  public tags: string | undefined;
  public filteredProducts: ProductInterface[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
    this.filteredProducts = this.products$;
  }

  public navigateToProductCreate(): void {
    this.router.navigate(['create-product']);
  }

  public navigateToProductDetails(id: number): void {
    this.router.navigate(['product', id]);
  }

  public removeProduct(id: number): void {
    this.products$ = this.products$.filter((product) => product.id !== id);
    this.productsService.removeProduct(id);
  }

  public filterByTag(): void {
    const filterParams = this.tags?.trim().toLowerCase().split(' ');

    this.filteredProducts = this.products$.filter((product) =>
      filterParams?.every((param) =>
        product.tags.some((tag) => tag.title?.toLowerCase().includes(param))
      )
    );
  }

  public clearTagsInput() {
    this.tags = '';
    this.filteredProducts = this.products$;
  }
}
