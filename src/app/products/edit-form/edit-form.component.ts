import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductInterface, Tags } from '../product.model';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit {
  public product: ProductInterface | undefined;
  public test: Map<string, string> = new Map()

  public editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    description: new FormControl(''),
    tags: new FormControl(),
  });

  public ngOnInit(): void {
    this.product = this.router.lastSuccessfulNavigation?.extras
      .state as ProductInterface;

    const inputTags = this.product.tags.map(tag => tag.title);
    const inputColors = this.product.tags.map(tag => tag.color);

    for (let i = 0; i< inputTags.length; i++) {
      this.test.set(inputTags[i], inputColors[i]);
    }

    console.log(this.test.size);


    this.editForm.setValue({
      name: this.product?.name,
      price: this.product?.price,
      description: this.product.description,
      tags: inputTags.join(', '),
    });
  }

  get name() {
    return this.editForm.get('name') as FormControl;
  }

  get price() {
    return this.editForm.get('price') as FormControl;
  }

  get description() {
    return this.editForm.get('description') as FormControl;
  }

  get tags() {
    return this.editForm.get('tags') as FormControl;
  }
  constructor(
    private productService: ProductsService,
    private router: Router,
  ) {}

  public isInvalid(controlName: string): boolean {
    const control = this.editForm.get(controlName) as FormControl;
    return control.invalid && (control.dirty || control.touched);
  }

  public updateProduct(): void {
    if (this.editForm.invalid) {
      return;
    }

    const newProduct: ProductInterface = {
      id: this.product?.id as number,
      name: this.name.value as string,
      price: this.price.value as number,
      description: this.description.value as string,
      tags: this.createTagsArray(),
    };

    this.productService.updateProduct(newProduct);
    this.navigateToProductDetails(this.product?.id);
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }

  public navigateToProductDetails(id: number | undefined): void {
    this.router.navigate(['product', id]);
  }

  public createTagsArray(): Tags[] {
    const tugsArray: Tags[] = [];
    const keysArray: string[] = Array.from(this.test.keys());
    const valuesArray: string[] = Array.from(this.test.values());

    for (let i = 0; i < this.test.size; i++) {
      tugsArray.push({
        title: keysArray[i],
        color: valuesArray[i]
      })
    }

    return tugsArray;
  }
}
