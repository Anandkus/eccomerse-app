import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user_url = "http://localhost:3000/users/";

  constructor(private apiService: ApiService) { }

  UserDataGet(userId: any) {
    return this.apiService.get(this.user_url + "?id=" + userId);
  }
  UpdateUserData(userId: any, dataObj: any): Observable<any> {
    return this.apiService.put(this.user_url + userId, dataObj);
  }
}
