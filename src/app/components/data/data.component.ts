import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  providers: [DataService]
})
export class DataComponent implements OnInit {
  public dirs: [any];
  public files: [any];
  public pathDirOpen: string;
  public dirParam: string;
  public arrayPath: any;
  public positionLasFolder: any;
  public isHome: boolean;

  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getData();

  }

  public getData():any {
    this.transformDir();
    this.dataservice.getData(this.dirParam).subscribe(
      response => {
        this.dirs = response.dirs;
        this.files = response.files;
        this.pathDirOpen = response.dirPath;

      },
      err => {
        console.log(err);
      }

    );
  }

  public transformDir(){
    this.route.params.subscribe((params: Params) => {
      this.dirParam = params.dir;
    });
    if (this.dirParam === 'home'){
      this.isHome = true;
    } else {
      this.isHome = false;
    }
  }

  public goUpDir(){
    this.transformDir();
    this.arrayPath = this.dirParam.split('-');
    this.arrayPath.pop();
    this.dirParam = '';
    for (const element of this.arrayPath){
      console.log(element);
      if (this.dirParam === ''){
        this.dirParam += element;
      }else {
        this.dirParam += '-' + element;
      }
      this.dirParam.slice(0, 3);
    }
    if (this.dirParam === ''){
      this.router.navigate(['link/home']);
    } else {
      this.router.navigate(['link/' + this.dirParam]);
    }
  }

  public dirClick(newDir: string){
    this.transformDir();
    if (this.dirParam.includes('home')){
      this.router.navigate(['link/' + newDir]);
    } else {
      this.dirParam = this.dirParam.concat('-' + newDir);
      this.router.navigate(['link/' + this.dirParam]);
    }
  }

}

