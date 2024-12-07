import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public product_url = "http://localhost:3000/product/";
  constructor(private apiService: ApiService) { }

  geAllProduct(): Observable<any> {
    return this.apiService.get(this.product_url);
  }

  addNewProduct(dto: any): Observable<any> {
    return this.apiService.post(this.product_url, dto);
  }

  singleProduct(id: any): Observable<any> {
    //console.log("serve id = ", id)
    return this.apiService.get(this.product_url  + id);
  }

  updateProduct(id: any, dto: any): Observable<any> {
    return this.apiService.put(this.product_url + id, dto)
  }

  deleteProduct(id: any): Observable<any> {
    return this.apiService.delete(this.product_url + id)
  }
}
