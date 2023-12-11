import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductInterface } from '../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @Output() public product?: ProductInterface;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    const id: number = +(this.activatedRoute.snapshot.paramMap.get('id') as string);

    this.product = this.productsService.getProductById(id as number);
  }

  public removeProduct(product: ProductInterface): void {
    if (product) {
      this.productsService.removeProduct(product.id as number);
    }

    this.goBack();
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }

  public navigateToProductUpdate(): void {
    this.router.navigate(['update-product'], { state: this.product });
  }
}
