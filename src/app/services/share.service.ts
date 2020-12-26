import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Global } from "../config";
import { Router } from "@angular/router";
import { LoginService } from "./login.service";

@Injectable()
export class ShareService {
  public url: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
  ) {
    this.url = Global.url;
  }

  shareFile(idFile: string, idUser: string): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      token: this.loginService.getToken(),
    });

    return this.http.post(`${this.url}shareFileToUser/${idFile}/${idUser}`, null, {headers})
  }
  shareDir(idDir: string, idUser: string): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      token: this.loginService.getToken(),
    });

    return this.http.post(`${this.url}shareDirToUser/${idDir}/${idUser}`, null, {headers})
  }

  whatIsShared() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      token: this.loginService.getToken(),
    });
    return this.http.get(`${this.url}whatIsShared`, {headers})
  }

  getDataDirShared(idDir: string){
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      token: this.loginService.getToken(),
    });
    return this.http.get(`${this.url}dataDirShared/${idDir}`, {headers})
  }


  setNewIdDir(idir: string){
      let pathArr = JSON.parse(localStorage.getItem('pathArr'))
      if (pathArr === null){
	  pathArr = []
      }
      pathArr.push(idir)
      localStorage.setItem('pathArr', JSON.stringify(pathArr))
  }

  getLastId(){
      let pathArr = JSON.parse(localStorage.getItem('pathArr'))
      return pathArr[pathArr.length - 1]
  }
  popPathArr() {
      let pathArr = JSON.parse(localStorage.getItem('pathArr'))
      pathArr.pop()
      localStorage.setItem('pathArr', JSON.stringify(pathArr))
      return this.getLastId()
  }
}
