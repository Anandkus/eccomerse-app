import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { address, order, product, user } from 'src/app/core/models/objet-model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  single_product_id: any;
  user_id: any;
  individual_product!: product;
  user_details!: user;
  user_address: any;
  user_contact_no: any;
  order_dto!: order;

  constructor(private router: Router, private customerService: CustomerService) { }
  ngOnInit() {
    this.customerService.currentProduct.subscribe(product_id => {
      this.single_product_id = product_id;
    })
    this.user_id = sessionStorage.getItem("user_session_id");
    this.productDetails(this.single_product_id);
    this.userAddress(this.user_id);
  }

  productDetails(single_product_id: any) {
    this.customerService.indiVidualProduct(single_product_id).subscribe(data => {
      this.individual_product = data;
      //console.log("product data= ", this.individual_product)
    }, error => { console.log("my error = ", error) })
  }
  userAddress(id: any) {
    this.customerService.userDetails(id).subscribe(data => {
      this.user_address = data;
      this.user_contact_no = data.mobileNo;
      //console.log("address= ", this.user_address)
    }, error => { console.log("my error = ", error) })
  }

  orderPlace() {
    this.order_dto = {
      id: 0,
      userid: this.user_id,
      sellerid: 2,
      product: {
        id: this.individual_product.id,
        name: this.individual_product.name,
        uploadphoto: this.individual_product.uploadphoto,
        desc: this.individual_product.desc,
        mrp: this.individual_product.mrp,
        dp: this.individual_product.dp,
        status: this.individual_product.status
      },
      deliveryaddress: {
        id: this.user_address.address.id,
        addLine1: this.user_address.address.addLine1,
        addLine2: this.user_address.address.addLine2,
        city: this.user_address.address.city,
        state: this.user_address.address.state,
        zipcode: this.user_address.address.zipcode
      },
      contact: this.user_contact_no,
      dateTime: new Date().toISOString()
    }
    // console.log('ordr place', this.order_dto)
    this.customerService.insertNewOrder(this.order_dto).subscribe(data => {
      alert("your order Place Successfully");
      this.router.navigateByUrl("/buyer-dashboard")
    }, error => { console.log("place order error => ", error) })
  }
}
