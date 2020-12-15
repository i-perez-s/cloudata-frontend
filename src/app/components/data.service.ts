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

  /*getFile(filePath: string, fileName: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'aplication/json');
    console.log(this.url + 'getFile/' + filePath + '/' + fileName)
    return this._http.get(this.url + 'getFile/' + filePath + '/' + fileName, {headers: headers});
  }
  getFileType(filePath: string, fileName: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'aplication/json');
    console.log(this.url + 'getFile/' + filePath + '/' + fileName)
    return this._http.get(this.url + 'getFileType/' + filePath + '/' + fileName, {headers: headers});
  }*/


  createDir(fileDir: string, newNameDir: string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.loginService.getToken()
    });
    console.log(headers)
    return this._http.post<any>(this.url + 'dir/' + fileDir + '/' + newNameDir, null, {headers});
  }


}
