import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import { LoginService } from "../../services/login.service";

@Component({
  selector: "nab",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
  providers: [LoginService, DataService],
})
export class NavComponent implements OnInit {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private dataService: DataService
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

  deleteUser() {
    let userId = this.loginService.decodeToken().usuario._id;
    console.log(userId);
    this.dataService.deleteUser(userId).subscribe(
      (response) => {
        this.logout();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
