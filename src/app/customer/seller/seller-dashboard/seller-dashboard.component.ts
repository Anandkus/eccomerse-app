import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent {
  order_dashboard_data: any;
  total_order: any;
  last_order_date: any;
  product_dashboard_data: any;
  total_product: number = 0;
  publish_product: number = 0;
  inactive_product: number = 0;
  draft_product: number = 0;

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
    this.sellerOrderDashboardData()
    this.sellerProductDashboardData()
  }

  sellerProductDashboard() {
    this.router.navigateByUrl("/seller/product")
  }

  sellerOrderDashboard() {
    alert("this option for only VIP candidates !")
  }

  sellerOrderDashboardData() {
    this.customerService.orderDashboardData().subscribe(data => {
      this.order_dashboard_data = data;
      this.total_order = Number(this.order_dashboard_data.length);
      this.last_order_date = this.order_dashboard_data[this.total_order - 1].
        dateTime
    }, error => { console.log("my error = ", error) })
  }

  sellerProductDashboardData() {
    this.customerService.productDashboardData().subscribe(data => {
      this.product_dashboard_data = data;
      for (let i in this.product_dashboard_data) {
        if (this.product_dashboard_data[i].status === 'publish') {
          ++this.publish_product;
        }
        else if (this.product_dashboard_data[i].status === 'inactive') {
          ++this.inactive_product;
        }
        else if (this.product_dashboard_data[i].status === 'draft') {
          ++this.draft_product;
        }
        ++this.total_product;
      }
    }, error => { console.log("my error = > ", error) })
  }
}
