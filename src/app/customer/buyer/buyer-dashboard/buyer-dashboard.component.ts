import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.css']
})
export class BuyerDashboardComponent {
  all_products: any;
  show_checkout: boolean = false;

  constructor(private router: Router, private customerService: CustomerService) { }
  ngOnInit() {
    this.getAllProduct()
  }
  getAllProduct() {
    this.customerService.getAllProduct().subscribe(data => {
      this.all_products = data;
      //console.log(this.all_products)
    }, error => { console.log("error=", error) })
  }
  buyProudct(id: any) {
    this.show_checkout = true;
    this.customerService.quickBuyProduct(id);
    this.router.navigateByUrl("/checkout");
  }

  addToCart() {
    alert("this is showcase !")
  }

}
