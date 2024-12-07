import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from '../core/models/objet-model';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userProfileForm!: FormGroup;
  userProfile: boolean = false;
  user_id: any;
  user_data: any;
  user_update_data: any;
  user_dto!: user;
  user_profile_pic: any;
  user_language: any;
  user_role: any;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.user_id = sessionStorage.getItem("user_session_id");
    this.userProfileForm = this.fb.group({
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
      uploadphoto: [''],
      // agreetc: ['', Validators.required],
      // role: ['', Validators.required],
    })
    this.editUserData(this.user_id);
  }

  get rf() {
    return this.userProfileForm.controls;
  }

  editUserData(user_id: any) {
    this.userService.UserDataGet(user_id).subscribe(data => {
      this.user_data = data;
      // console.log(this.user_data[0].name)
      this.user_profile_pic = this.user_data[0].uploadphoto;
      this.user_language = this.user_data[0].language;
      this.user_role = this.user_data[0].role;
      this.userProfileForm.setValue({
        name: this.user_data[0].name,
        mobileNo: this.user_data[0].mobileNo,
        age: this.user_data[0].age,
        dob: this.user_data[0].dob,
        email: this.user_data[0].email,
        password: this.user_data[0].password,
        addLine1: this.user_data[0].address.addLine1,
        addLine2: this.user_data[0].address.addLine2,
        city: this.user_data[0].address.city,
        state: this.user_data[0].address.state,
        zipcode: this.user_data[0].address.zipcode,
        language: this.user_data[0].language,
        gender: this.user_data[0].gender,
        aboutyou: this.user_data[0].aboutyou,
        uploadphoto: '',
        // agreetc: this.user_data[0].agreetc,
        // role: this.user_data[0].role,
      })

    }, error => { console.log("error = ", error) })
  }

  updateUser() {
    if (this.userProfileForm.invalid) {
      alert("pls check field required !");
      return;
    }
    this.user_update_data = this.userProfileForm.value;
    this.user_dto = {
      //id:0,
      name: this.user_update_data.name,
      mobileNo: this.user_update_data.mobileNo,
      age: this.user_update_data.age,
      dob: this.user_update_data.dob,
      email: this.user_update_data.email,
      password: this.user_update_data.password,
      address: {
        id: 0,
        addLine1: this.user_update_data.addLine1,
        addLine2: this.user_update_data.addLine2,
        city: this.user_update_data.city,
        state: this.user_update_data.state,
        zipcode: this.user_update_data.zipcode,
      },
      language: this.user_update_data.language,
      gender: this.user_update_data.gender,
      aboutyou: this.user_update_data.aboutyou,
      uploadphoto: (this.user_update_data.uploadphoto == "" ? this.user_profile_pic : this.user_update_data.uploadphoto),
      agreetc: this.user_data[0].agreetc,
      role: this.user_data[0].role,
    }
    this.userService.UpdateUserData(this.user_id, this.user_dto).subscribe(data => {
      this.userProfileForm.reset();
      alert("profile update success !");
      if (this.user_role === 'admin') {
        this.router.navigateByUrl("/admin/dashboard");
      }
      else if (this.user_role === 'seller') {
        this.router.navigateByUrl("/seller-dashboard");
      }
      else if (this.user_role === 'buyer') {
        this.router.navigateByUrl("/buyer-dashboard");
      }
    }, error => { console.log(" user profile update err", error) })
  }
}
