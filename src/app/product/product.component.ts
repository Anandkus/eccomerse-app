import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { product } from '../core/models/objet-model';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  all_product_data: any;
  addEditProudctForm!: FormGroup;
  addEditProduct: boolean = false;
  popup_header!: string;
  add_product: boolean = false;
  edit_product: boolean = false;
  product_data: any;
  single_product_data: any;
  product_dto!: product;
  edit_product_id: any;
  constructor(private router: Router, private productService: ProductService, private fb: FormBuilder) { }
  ngOnInit() {
    this.addEditProudctForm = this.fb.group({
      name: ['', Validators.required],
      uploadphoto: [''],
      desc: ['', Validators.required],
      mrp: ['', Validators.required],
      dp: ['', Validators.required],
      status: ['', Validators.required],
    })
    this.getAllProduct()
  }
  get rf() {
    return this.addEditProudctForm.controls;
  }

  getAllProduct() {
    this.productService.geAllProduct().subscribe(data => {
      this.all_product_data = data;
      console.log("all product = ", this.all_product_data)
    }, error => { console.log("error= ", error) })
  }

  addProductPopup() {
    this.add_product = true;
    this.edit_product = false;
    this.popup_header = "Add New Product !";
    this.addEditProudctForm.reset();
  }

  addNewProduct() {
    this.addEditProduct = true;
    if (this.addEditProudctForm.invalid) {
      return
    }
    this.product_data = this.addEditProudctForm.value;
    this.product_dto = {
      id:String(Math.random()),
      name: this.product_data.name,
      uploadphoto: this.product_data.uploadphoto,
      desc: this.product_data.desc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status,
    }
    this.productService.addNewProduct(this.product_dto).subscribe(data => {
      alert("product add Successfully !");
      // this.addEditProudctForm.reset();
      this.getAllProduct();
    }, error => { console.log("error= ", error) })
  }

  editProductPopup(id: any) {
    this.edit_product_id = id;
    this.add_product = false;
    this.edit_product = true;
    this.popup_header = "Edit Product !";
    this.addEditProudctForm.reset();
   // console.log("id = ",this.edit_product_id)
    this.productService.singleProduct(this.edit_product_id).subscribe(data => {
      this.single_product_data = data;
      console.log("single data = ", this.single_product_data);
      this.addEditProudctForm.setValue({
        name: this.single_product_data.name,
        uploadphoto: this.single_product_data.uploadphoto,
        desc: this.single_product_data.desc,
        mrp: this.single_product_data.mrp,
        dp: this.single_product_data.dp,
        status: this.single_product_data.status,
      })
    }, error => { console.log("error= ", error) })
  }

  updateProduct() {
    this.addEditProduct = true;
    if (this.addEditProudctForm.invalid) {
      return
    }
    this.product_data = this.addEditProudctForm.value;
    this.product_dto = {
      id: this.edit_product_id,
      name: this.product_data.name,
      uploadphoto: this.product_data.uploadphoto,
      desc: this.product_data.desc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status,
    }
    this.productService.updateProduct(this.edit_product_id, this.product_dto).subscribe(data => {
      this.getAllProduct();
      alert("product update Successfully !");
    }, error => { console.log("error= ", error) })
  }

  deleteProduct(id: any) {
    let conf = confirm("do you want to delete product id:" + id);
    if (conf) {
      this.productService.deleteProduct(id).subscribe(data => {
        this.getAllProduct();
      }, error => { console.log("error= ", error) })
    }
    else {
      alert("You Pressed cancel !")
    }
  }
}
