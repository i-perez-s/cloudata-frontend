import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public user: any;
  public wrongData: boolean;
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.user = {};
    this.wrongData = false;
   }

  ngOnInit(): void {
  }

  login() {
    console.log(this.user);
    this.loginService.login(this.user).subscribe(
      response => {
        if (response.ok === true) {
          this.loginService.setToken(response.token);
          console.log('ok true');
          this.router.navigate(['/cloudData/home']);
        }
      },
      err => {
        console.log(err);
        this.wrongData = true;
      },

    );
  }

}
