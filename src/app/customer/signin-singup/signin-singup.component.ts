import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/core/models/objet-model';
import { LoginSignupService } from 'src/app/shared/services/login-signup.service';

@Component({
  selector: 'app-signin-singup',
  templateUrl: './signin-singup.component.html',
  styleUrls: ['./signin-singup.component.css']
})
export class SigninSingupComponent {
  regForm: boolean = false;
  signUpForm!: FormGroup;
  singInForm!: FormGroup;
  signUpSubmitted = false;
  href: string = '';
  userData: any;
  userDataObject!: user;
  userRegData: any;
  signInFormValue: any = {};
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginSignupService) {
    // this.signUpForm = this.fb.group({
    //   name: ['', Validators.required],
    //   mobileNo: ['', Validators.required],
    //   age: ['', Validators.required],
    //   dob: ['', Validators.required],
    //   email: ['', Validators.required],
    //   password: ['', Validators.required],
    //   addLine1: ['', Validators.required],
    //   addLine2: ['', Validators.required],
    //   state: ['', Validators.required],
    //   city: ['', Validators.required],
    //   zipcode: ['', Validators.required],
    //   language: ['', Validators.required],
    //   gender: ['', Validators.required],
    //   aboutyou: ['', Validators.required],
    //   uploadphoto: ['', Validators.required],
    //   agreetc: ['', Validators.required],
    //   role: ['', Validators.required],
    // })
  }

  ngOnInit(): void {
    this.href = this.router.url;
    if (this.href === '/sign-up') {
      this.regForm = true;
    }
    else if (this.href === '/sign-in') {
      this.regForm = false;
    }
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      mobileNo: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      addLine1: ['', Validators.required],
      addLine2: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutyou: ['', Validators.required],
      uploadphoto: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required],
    })

    this.singInForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })

  }

  get rf() {
    return this.signUpForm.controls;
  }

  onSubmitSignUp(): void {
    this.signUpSubmitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.userRegData = this.signUpForm.value;
    this.userDataObject = {
      //id:0,
      name: this.userRegData.name,
      mobileNo: this.userRegData.mobileNo,
      age: this.userRegData.age,
      dob: this.userRegData.dob,
      email: this.userRegData.email,
      password: this.userRegData.password,
      address: {
        id: 0,
        addLine1: this.userRegData.addLine1,
        addLine2: this.userRegData.addLine2,
        city: this.userRegData.city,
        state: this.userRegData.state,
        zipcode: this.userRegData.zipcode,
      },
      language: this.userRegData.language,
      gender: this.userRegData.gender,
      aboutyou: this.userRegData.aboutyou,
      uploadphoto: this.userRegData.uploadphoto,
      agreetc: this.userRegData.agreetc,
      role: this.userRegData.role,
    }
    this.loginService.userRegister(this.userDataObject).subscribe(data => {
      alert("successfully register data  !");
      this.signUpForm.reset();
      this.router.navigateByUrl("/sign-in")
    })
  }

  onSubmitSignIn(): void {
    const email = this.singInForm.value.email;
    const password = this.singInForm.value.password;

    this.loginService.authLogin(email, password).subscribe(data => {
      this.userData = data;
      console.log("data =", data);
      if (this.userData.length == 1) {
        if (this.userData[0].role === 'seller') {
          sessionStorage.setItem("user_session_id", this.userData[0].id);
          sessionStorage.setItem("role", this.userData[0].role);
          this.router.navigateByUrl("/seller-dashboard")
        }
        else if (this.userData[0].role === 'buyer') {
          sessionStorage.setItem("user_session_id", this.userData[0].id);
          sessionStorage.setItem("role", this.userData[0].role);
          this.router.navigateByUrl("/buyer-dashboard")
        }
        else {
          alert("invalid login value !")
        }
      }
      else {
        alert("invalid value !")
      }
    })
  }
}
