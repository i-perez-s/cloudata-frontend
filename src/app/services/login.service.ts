import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from '../config';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";


@Injectable ()
export class LoginService{
  public url: string;
  public dataText: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ){
    this.url = Global.url;
  }
  login(user: any): Observable<any>{
    return this.http.post<any>(this.url + 'login', user);
  }
  register(user: any): Observable<any>{
    return this.http.post<any>(this.url + 'user', user);
  }
  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token): any {
    localStorage.setItem('token', token);
  }

  logout(): any {
    localStorage.removeItem('token');
  }
  checkToken() {
    const isToken = this.loggedIn();
    if (isToken === false) {
      this.router.navigate(["/"]);
    }
  }
  decodeToken() {
    return jwt_decode(this.getToken());
  }

  getDataFile(id:string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.getToken()
    });
      return this.http.get(this.url + 'getDataFile/' + id, {headers})
  }

  setDataText(text: string){
      this.dataText = text;
  }

  getDataText(){
      return this.dataText;
  }


}
