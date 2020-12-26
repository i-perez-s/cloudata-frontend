import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { LoginService } from "../../services/login.service";
import { Global } from "../../config";
import { UploadService } from "../../services/upload.service";
import { ShareService } from "../../services/share.service";

@Component({
  selector: "app-share",
  templateUrl: "./share.component.html",
  styleUrls: ["./share.component.css"],
  providers: [DataService, LoginService, UploadService, ShareService],
})
export class ShareComponent implements OnInit {
  public dirs: [];
  public files: [];
  public pathDirOpen: string;
  public dirParam: string;
  public isHome: boolean;
  public arrayPath: any;

  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private shareService: ShareService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.transformDir();
    this.loginService.checkToken()
    if ( this.isHome === true ) {
	this.getSharedWithMe()
	localStorage.removeItem('pathArr')
    } else {
	if (this.dirParam != this.shareService.getLastId()){
	    localStorage.removeItem('pathArr')
	    this.router.navigate(["/link/share/home"])
	}
      this.getData(this.dirParam);
    }
  }

  public getSharedWithMe(): any {
    this.shareService.whatIsShared().subscribe(
      (response: {ok: boolean, data:{files, dirs}}) => {
        this.dirs = response.data.dirs;
        this.files = response.data.files;

	this.dirs.forEach((dir: {_id, creator}) => {
    this.loginService.getAllUsers().subscribe(
      (response: { ok; usarios }) => {
        let users = response.usarios;
          var creatorUser = users.filter(function (value, index, arr) {
            return value._id === dir._id;
          });
	  dir.creator = creatorUser[0].email
	  console.log(dir)
        },
      (err) => {
        console.log(err);
      }
    );
	}),
        this.files.forEach((element: {nombre: string}) => {
          if (element.nombre.length > 20) {
            let name = element.nombre;
            let nameSplit = name.split(".");
            const ext = nameSplit[nameSplit.length - 1];
            nameSplit.pop();
            name = "";
            nameSplit.forEach((val) => {
              name += val;
            });
            let manyDelete = name.length + ext.length + 3 - 20;
            name.slice(name.length - manyDelete, name.length);
            let nameChanged = name.substring(0, name.length - manyDelete);
            nameChanged += `...${ext}`;
            element.nombre = nameChanged;
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public getData(idDir: string): any {
    this.shareService.getDataDirShared(idDir).subscribe(
      (response: {carpetas: [], ok: boolean, archivos: []}) => {
        this.dirs = response.carpetas;
        this.files = response.archivos;
        this.files.forEach((element: {nombre:string}) => {
          if (element.nombre.length > 20) {
            let name = element.nombre;
            let nameSplit = name.split(".");
            const ext = nameSplit[nameSplit.length - 1];
            nameSplit.pop();
            name = "";
            nameSplit.forEach((val) => {
              name += val;
            });
            let manyDelete = name.length + ext.length + 3 - 20;
            name.slice(name.length - manyDelete, name.length);
            let nameChanged = name.substring(0, name.length - manyDelete);
            nameChanged += `...${ext}`;
            element.nombre = nameChanged;
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public transformDir() {
    this.route.params.subscribe((params: Params) => {
      this.dirParam = params.path;
    });
    if (this.dirParam === "home") {
      this.isHome = true;
    } else {
      this.isHome = false;
    }
  }

  public goUpDir () {
      let upDirId = this.shareService.popPathArr()
      if (upDirId === undefined){
	  this.router.navigate(['link/share/home'])
      } else {
	  this.router.navigate(['link/share/' + upDirId])
      }
  }

  public dirClick(newDir: string) {
      this.shareService.setNewIdDir(newDir);
      this.router.navigate(["link/share/" + newDir]);
  }
}
