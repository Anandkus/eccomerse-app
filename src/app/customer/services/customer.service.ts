import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public singleproduct_id = new BehaviorSubject(null);
  currentProduct = this.singleproduct_id.asObservable();

  public user_url = "http://localhost:3000/users/";
  public product_url = "http://localhost:3000/product/";
  public order_url = "http://localhost:3000/order/";

  constructor(private apiService: ApiService) { }



  getAllProduct(): Observable<any> {
    return this.apiService.get(this.product_url)
  }
  quickBuyProduct(product_id: any) {
    this.singleproduct_id.next(product_id);
  }
  indiVidualProduct(id: any): Observable<any> {
    return this.apiService.get(this.product_url + id);
  }
  userDetails(id: any): Observable<any> {
    return this.apiService.get(this.user_url + id);
  }
  insertNewOrder(obj_dto: any): Observable<any> {
    return this.apiService.post(this.order_url, obj_dto);
  }
  orderDashboardData(): Observable<any> {
    return this.apiService.get(this.order_url);
  }
  productDashboardData(): Observable<any> {
    return this.apiService.get(this.product_url);
  }
}
