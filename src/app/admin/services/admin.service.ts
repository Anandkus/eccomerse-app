import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public user_url = "http://localhost:3000/users/";
  public product_url = "http://localhost:3000/product/";
  public all_user = "http://localhost:3000/users/";

  constructor(private apiService: ApiService) { }

  userDashboardData(): Observable<any> {
    return this.apiService.get(this.user_url);
  }
  productDashboradData(): Observable<any> {
    return this.apiService.get(this.product_url);
  }
  allUser(): Observable<any> {
    return this.apiService.get(this.all_user);
  }
  addUser(dataObj: any): Observable<any> {
    return this.apiService.post(this.user_url, dataObj);
  }
  singleUserget(userId: any): Observable<any> {
    return this.apiService.get(this.user_url + "?id=" + userId);
  }
  editUser(userId: any, dataObj: any): Observable<any> {
    return this.apiService.put(this.user_url + userId, dataObj);
  }
  deleteUser(userId: any): Observable<any> {
    return this.apiService.delete(this.user_url + userId)
  }
}
