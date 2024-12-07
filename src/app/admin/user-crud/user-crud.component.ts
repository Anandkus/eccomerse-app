import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/core/models/objet-model';
import { AdminService } from '../services/admin.service';
declare var JQuery: any;
@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent {
  constructor(private router: Router, private adminService: AdminService, private fb: FormBuilder) {

  }
  all_user_data: any;
  single_user_data: any;
  addEditUserForm!: FormGroup;
  user_dto!: user;
  user_reg_data: any;
  edit_user_id: any;
  upload_file_name!: string;
  addEditUser: boolean = false; //for form validation
  add_user: boolean = false;
  edit_user: boolean = false;
  popup_header!: string;
  singleInFormValue: any = {};

  ngOnInit(): void {
    this.getAlluser();
    this.addEditUserForm = this.fb.group({
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
      agreetc: ['', Validators.required],
      role: ['', Validators.required],
    })
  }

  rf() {
    return this.addEditUserForm.controls;
  }

  getAlluser() {
    this.adminService.allUser().subscribe(data => {
      this.all_user_data = data;
    })
  }

  addUserPopUp() {
    this.edit_user = false;
    this.add_user = true;
    this.popup_header = "Add New User";
    this.addEditUserForm.reset();
  }
  addUser() {
    this.addEditUser = true;
    if (this.addEditUserForm.invalid) {
      alert("pls check field required !");
      return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      //id:0,
      name: this.user_reg_data.name,
      mobileNo: this.user_reg_data.mobileNo,
      age: this.user_reg_data.age,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      password: this.user_reg_data.password,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipcode: this.user_reg_data.zipcode,
      },
      language: this.user_reg_data.language,
      gender: this.user_reg_data.gender,
      aboutyou: this.user_reg_data.aboutyou,
      uploadphoto: this.user_reg_data.uploadphoto,
      agreetc: this.user_reg_data.agreetc,
      role: this.user_reg_data.role,
    }
    this.adminService.addUser(this.user_dto).subscribe(data => {
      this.getAlluser();
      //JQuery("#addEditUserModal").modal("toggle")
      this.addEditUserForm.reset();

    }, error => { console.log("admin user add err", error) })
  }

  editUserPopup(id: any) {
    this.edit_user_id = id;
    this.edit_user = true;
    this.add_user = false;
    this.popup_header = "Edit  User";
    this.adminService.singleUserget(this.edit_user_id).subscribe(data => {
      this.single_user_data = data;
      this.upload_file_name = this.single_user_data[0].uploadphoto;
      //console.log(this.upload_file_name)
      //this.addEditUserForm.patchValue(this.single_user_data[0])
      this.addEditUserForm.setValue({
        name: this.single_user_data[0].name,
        mobileNo: this.single_user_data[0].mobileNo,
        age: this.single_user_data[0].age,
        dob: this.single_user_data[0].dob,
        email: this.single_user_data[0].email,
        password: this.single_user_data[0].password,
        addLine1: this.single_user_data[0].address.addLine1,
        addLine2: this.single_user_data[0].address.addLine2,
        city: this.single_user_data[0].address.city,
        state: this.single_user_data[0].address.state,
        zipcode: this.single_user_data[0].address.zipcode,
        language: this.single_user_data[0].language,
        gender: this.single_user_data[0].gender,
        aboutyou: this.single_user_data[0].aboutyou,
        uploadphoto: '',
        agreetc: this.single_user_data[0].agreetc,
        role: this.single_user_data[0].role,
      })
    }, error => { console.log("admin user setvalue err", error) })
  }

  updateUser() {
    if (this.addEditUserForm.invalid) {
      alert("pls check field required !");
      return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      //id:0,
      name: this.user_reg_data.name,
      mobileNo: this.user_reg_data.mobileNo,
      age: this.user_reg_data.age,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      password: this.user_reg_data.password,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipcode: this.user_reg_data.zipcode,
      },
      language: this.user_reg_data.language,
      gender: this.user_reg_data.gender,
      aboutyou: this.user_reg_data.aboutyou,
      uploadphoto: (this.user_reg_data.uploadphoto == "" ? this.upload_file_name : this.user_reg_data.uploadphoto),
      agreetc: this.user_reg_data.agreetc,
      role: this.user_reg_data.role,
    }
    this.adminService.editUser(this.edit_user_id, this.user_dto).subscribe(data => {
      this.getAlluser();
      // JQuery("#addEditUserModal").modal("toggle")
      this.addEditUserForm.reset();

    }, error => { console.log("admin user add err", error) })
  }

  deleteUser(userId: any) {
    this.adminService.deleteUser(userId).subscribe(data => {
      this.getAlluser();
    }, error => { console.log("admin delete err", error) })
  }

}
