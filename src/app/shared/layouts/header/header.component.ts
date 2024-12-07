import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logged_in: boolean = false;;
  language: string = "English";
  user_role!: any;

  constructor(private router: Router) { }

  ngOnInint() { }
  ngDoCheck() {
    this.user_role = sessionStorage.getItem("role");
    //console.log(this.user_role);
    const session_id = sessionStorage.getItem("user_session_id");
    if (session_id) {
      this.logged_in = true;
    }
  }
  logOut() {
    sessionStorage.removeItem("user_session_id");
    sessionStorage.removeItem("role");
    this.router.navigateByUrl("/sign-in");
    // location.reload();
    this.logged_in = false;
  }
}
