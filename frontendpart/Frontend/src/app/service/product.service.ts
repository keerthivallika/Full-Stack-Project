import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
      private apiUrl = 'http://localhost:8081/products';

      constructor(private http: HttpClient) {}
    
      getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}`);
      }
    
      addProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.apiUrl}/add`, product);
      }
    
      deleteProduct(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete/${id}`, {responseType: 'text'});
      }
}
