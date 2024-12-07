import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserCrudComponent } from './admin/user-crud/user-crud.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BuyerDashboardComponent } from './customer/buyer/buyer-dashboard/buyer-dashboard.component';
import { CheckoutComponent } from './customer/buyer/checkout/checkout.component';
import { SellerDashboardComponent } from './customer/seller/seller-dashboard/seller-dashboard.component';
import { SigninSingupComponent } from './customer/signin-singup/signin-singup.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { PageNotFoundComponent } from './shared/layouts/page-not-found/page-not-found.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminAuthGuardLogin, AdminAuthGuardService, BuyerAuthGuardService, sellerAuthGuardService, sellerBuyerAuthGuardLogin } from './shared/services/auth-guard.service';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "my-profile", component: UserProfileComponent },
  { path: "contact", component: ContactUsComponent },
  //admin ke liye childern route
  {
    path: "",canActivate:[AdminAuthGuardLogin] ,children: [
      { path: "admin-login", component: AdminLoginComponent }
    ]
  },
  {
    path: "",canActivate:[AdminAuthGuardService] ,children: [
      { path: "admin/dashboard", component: DashboardComponent },
      { path: "admin/user", component: UserCrudComponent },
      { path: "admin/product", component: ProductComponent }
    ]
  },
  //login signup
  {
    path: "",canActivate:[sellerBuyerAuthGuardLogin], children: [
      { path: "sign-in", component: SigninSingupComponent },
      { path: "sign-up", component: SigninSingupComponent }
    ]
  },
  //seller 
  {
    path: "",canActivate:[sellerAuthGuardService], children: [
      { path: "seller-dashboard", component: SellerDashboardComponent },
      { path: "seller/product", component: ProductComponent }
    ]
  },
  //buyyer
  {
    path: "",canActivate:[BuyerAuthGuardService], children: [
      { path: "buyer-dashboard", component: BuyerDashboardComponent },
      { path: "checkout", component: CheckoutComponent }
    ]
  },
  {
    path: "**", component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
