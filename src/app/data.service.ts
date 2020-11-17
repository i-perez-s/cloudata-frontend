import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';




@Injectable ()
export class DataService{
  public url:string

  constructor(
    private _http: HttpClient
  ){
    this.url = 'http://localhost:8888/';
  }

  getData(dir: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'aplication/json');
    return this._http.get(this.url + dir, {headers: headers});
  }
  getFile(filePath: string, fileName: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'aplication/json');
    return this._http.get(this.url + 'getFile/' + filePath + '/' + fileName, {headers: headers});
  }


  createDir(fileDir: string, newNameDir: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'aplication/json');
    return this._http.get(this.url + 'createDir/' + fileDir + '/' + newNameDir, {headers: headers});
  }


}

