import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router, private adminService: AdminService) { }
  user_dashboard_data: any;
  total_user: number = 0;
  admin_user: number = 0;
  seller_user: number = 0;
  buyer_user: number = 0;

  product_dashboard_data: any;
  total_product: number = 0;
  publish_product: number = 0;
  inActive_product: number = 0;
  draft_product: number = 0;

  ngOnInit() {
    this.adminUserDashboardData();
    this.adminProductDashboard();
  }
  userDashboard() {
    this.router.navigateByUrl("/admin/user")
  }

  productDashboard() {
    this.router.navigateByUrl("/admin/product")
  }

  adminUserDashboardData() {
    this.adminService.userDashboardData().subscribe(data => {
      this.user_dashboard_data = data;
      for (let user in this.user_dashboard_data) {
        if (this.user_dashboard_data[user].role == 'admin') {
          ++this.admin_user;
        }
        else if (this.user_dashboard_data[user].role == 'seller') {
          ++this.seller_user;
        }
        else if (this.user_dashboard_data[user].role == 'buyer') {
          ++this.buyer_user;
        }
        ++this.total_user;
      }
    }, error => {
      console.log("admin service  ", error)
    }
    )
  }

  adminProductDashboard() {
    this.adminService.productDashboradData().subscribe(data => {
      this.product_dashboard_data = data;
      for (let product in this.product_dashboard_data) {
        if (this.product_dashboard_data[product].status == 'publish') {
          ++this.publish_product;
        }
        else if (this.product_dashboard_data[product].status == 'inactive') {
          ++this.inActive_product;
        }
        if (this.product_dashboard_data[product].status == 'draft') {
          ++this.draft_product;
        }
        ++this.total_product;
      }
    }, error => { console.log("admin service  ", error) }
    )
  }
}
