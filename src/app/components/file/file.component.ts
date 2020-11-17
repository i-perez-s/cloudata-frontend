import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
  providers: [DataService]
})
export class FileComponent implements OnInit {
  public dirParam: string;
  public fileDir: string;

  public respose: any;


  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.getData();

  }

  public getData():any {
    this.transformDir();
    console.log(this.dirParam);
    this.dataservice.getFile(this.fileDir, this.dirParam).subscribe(
      response => {
        console.log(response);
        this.respose = response;

      },
      err => {
        console.log(err);
      }

    );
  }

  public transformDir(){
    this.route.params.subscribe((params: Params) => {
      this.dirParam = params.file;
      this.fileDir = params.path;
      if(this.fileDir === 'home'){
        this.fileDir = '';
      }
    });
  }

}
