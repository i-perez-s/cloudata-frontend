import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from './services/login.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [LoginService]
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private tittle: Title, private loginService: LoginService) {}

  ngOnInit(): void {
    this.tittle.setTitle("Datacloud");
    //this.router.navigate(['cloudData/home']);
  }

  
}
