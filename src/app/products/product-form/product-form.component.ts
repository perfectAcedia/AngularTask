import { Component } from '@angular/core';
import { ProductInterface, Tags } from '../product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  public tagsArray: Tags[] = [];
  public tagInput: string = '';
  public colorInput: string = '';

  public productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(null, Validators.required),
    description: new FormControl(''),
    tag: new FormControl(''),
    color: new FormControl('')
  });

  get name() {
    return this.productForm.get('name') as FormControl;
  }

  get price() {
    return this.productForm.get('price') as FormControl;
  }

  get description() {
    return this.productForm.get('description') as FormControl;
  }

  get tag() {
    return this.productForm.get('tag') as FormControl;
  }

  get color() {
    return this.productForm.get('color') as FormControl;
  }

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  public isInvalid(controlName: string): boolean {
    const control = this.productForm.get(controlName) as FormControl;
    return control.invalid && (control.dirty || control.touched);
  }

  public addTag(tagTitle: string, tagColor: string) {
    this.tagsArray.push({
      title: tagTitle,
      color: tagColor
    })

    this.productForm.patchValue({tag: '', color: ''});
  }

  public addProduct(): void {
    if (this.productForm.invalid) {
      return;
    }

    const newProduct: ProductInterface = {
      id: this.productService.maxId() + 1,
      name: this.name.value as string,
      price: this.price.value as number,
      description: this.description.value as string,
      tags: this.tagsArray,
    };

    this.productService.createProduct(newProduct);
    this.goBack();
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }
}
