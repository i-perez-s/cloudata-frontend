import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-create-dir',
  templateUrl: './create-dir.component.html',
  styleUrls: ['./create-dir.component.css'],
  providers: [DataService]
})
export class CreateDirComponent implements OnInit {
public nameNewDir: string
  public actualDir: string

  constructor(
    private _dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public createDir(){
    this.transformDir()
    console.log(this.actualDir);
    this._dataService.createDir(this.actualDir, this.nameNewDir)
  }

  public transformDir(){
    this.route.params.subscribe((params: Params) => {
      this.actualDir = params.dir;
    });
  }

}
