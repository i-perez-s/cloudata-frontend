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
  public url: string = 'http://localhost:8888/';
  public isImg: boolean;
  public responseText: string;
  public responseTextSplitted: any;

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
    this.dataservice.getFileType(this.fileDir, this.dirParam).subscribe(
      response => {
        if(response.type === 'img' || response.type === 'text'){
          this.isImg = true
        } else {
          this.isImg = false
        }
        if (response.type === 'text'){
          this.responseText = response.data;
          this.responseTextSplitted = this.responseText.split('\n');
        }
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
