import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { LoginService } from "../../services/login.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [LoginService],
})
export class HomeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const isToken = this.loginService.loggedIn();
    if (isToken === false) {
      this.router.navigate(["/"]);
    } else {
      this.router.navigate(["/cloudData/home"]);
    }
  }
}
