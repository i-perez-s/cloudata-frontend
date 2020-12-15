import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [LoginService]
})
export class SignUpComponent implements OnInit {
  public user: any;
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.user = {};
   }

  ngOnInit(): void {
  }

  register() {
    console.log(this.user);
    this.loginService.register(this.user).subscribe(
      response => {
        if (response.ok === true) {
          this.loginService.login(this.user).subscribe(
            r => {
              if (r.ok === true) {
                this.loginService.setToken(r.token);
                console.log('ok true');
                this.router.navigate(['/cloudData/home']);
              }
            },
            e => {
              console.log(e);
            },
          );
        }
      },
      err => {
        console.log(err);
      },

    );
  }
  }


