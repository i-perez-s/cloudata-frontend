import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  constructor(private router: Router,  private tittle: Title){
  }


  ngOnInit(): void  {
    this.tittle.setTitle('Datacloud');
    //this.router.navigate(['cloudData/home']);

  }

}
