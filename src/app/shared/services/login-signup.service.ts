import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {
  public login_url = "http://localhost:3000";
  public reg_url = "http://localhost:3000";

  constructor(private http: HttpClient, private ApiService: ApiService) { }

  authLogin(username: any, password: any): Observable<any> {
    return this.ApiService.get(this.login_url + '/users?email=' + username + '&password=' + password)
  };

  userRegister(userData: any): Observable<any> {
    return this.ApiService.post(this.reg_url + '/users', userData)
  }
  adminLogin(username: any, password: any): Observable<any> {
    return this.ApiService.get(this.login_url + '/users?email=' + username + '&password=' + password + '&role=admin')
  };
}
