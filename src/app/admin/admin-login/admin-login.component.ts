import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSignupService } from 'src/app/shared/services/login-signup.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  singInForm!: FormGroup;
  user_data: any;
  constructor(private router: Router, private loginService: LoginSignupService) {
    this.singInForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
   }
  ngOnInit() {
    
  }

  onSubmitSignIn() {
    const email = this.singInForm.value.email;
    const password = this.singInForm.value.password;
    console.log(email, password)
    this.loginService.adminLogin(email,password).subscribe(data => {
      this.user_data = data;
      console.log("admin data= ", data);
      if (this.user_data.length === 1) {
        sessionStorage.setItem("user_session_id", this.user_data[0].id);
        sessionStorage.setItem("role", this.user_data[0].role);
        this.router.navigateByUrl("/admin/dashboard")
      }
      else {
        alert("invalid !!")
      }
    }, error => {
      console.log("Something wrong !")
    })
  }
}
