import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



import { LoginService } from '../services/login.service';

@Injectable ()
export class DataService{
  public url:string

  constructor(
    private _http: HttpClient,
    private loginService: LoginService
  ){
    this.url = 'http://localhost:8888/';
  }

  getData(dir: string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.loginService.getToken()
    });

    return this._http.get(this.url + 'getData/' + dir, {headers});
  }

  createDir(fileDir: string, newNameDir: string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.loginService.getToken()
    });
    return this._http.post<any>(this.url + 'dir/' + fileDir + '/' + newNameDir, null, {headers});
  }

  getTextContent(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.loginService.getToken()
    });
    return this._http.get<any>(this.url + 'getTextFile/' + id, {headers});
  }

  deleteFile(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.loginService.getToken()
    });

    return this._http.delete(`${this.url}file/${id}`, {headers})
  }
  deleteDir(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.loginService.getToken()
    });

    return this._http.delete(`${this.url}dir/${id}`, {headers})
  }

  deleteUser(idUser: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.loginService.getToken()
    });
    return this._http.delete(`${this.url}user/${idUser}`, {headers})
  }
}
