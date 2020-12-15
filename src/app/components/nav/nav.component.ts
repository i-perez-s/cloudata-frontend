import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";


import { LoginService } from "../../services/login.service";

@Component({
  selector: "nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
  providers: [LoginService],
})
export class NavComponent implements OnInit {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(["/"]);
  }
}
