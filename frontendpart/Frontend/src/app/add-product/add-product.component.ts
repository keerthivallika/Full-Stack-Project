import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService,Product } from '../service/product.service';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
        newProduct: Product = {name: '', price: 0 };
        message: string = '';
      
        constructor(private productService: ProductService) {}
      
        addProduct() {
          this.productService.addProduct(this.newProduct).subscribe({
            next: (res) => {
              console.log('Product added successfully', res);
              this.message = 'Product added successfully!';
              this.newProduct = {name: '', price: 0 }; // Reset form
            },
            error: (err) => {
              console.error('Error adding product', err);
              this.message = 'Error adding product!';
            }
          });
        }
 
}
