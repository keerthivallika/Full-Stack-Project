import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService,Product } from '../service/product.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent{
          products: Product[] = [];
          message: string = '';
        
          constructor(private productService: ProductService) {}
        
          ngOnInit() {
            this.loadProducts();
          }
        
          loadProducts() {
            this.productService.getProducts().subscribe({
              next: (data) => {
                this.products = data;
              },
              error: (err) => {
                console.error('Error loading products', err);
              }
            });
          }
        
          deleteProduct(id: number) {
            if (confirm('Are you sure you want to delete this product?')) {
              this.productService.deleteProduct(id).subscribe({
                next: () => {
                  this.message = 'Product deleted successfully!';
                  this.loadProducts(); // Refresh the list after deletion
                },
                error: (err) => {
                  console.error('Error deleting product', err);
                  this.message = 'Error deleting product!';
                }
              });
            }
          }
}

