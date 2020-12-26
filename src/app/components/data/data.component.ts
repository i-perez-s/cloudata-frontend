import { Component, OnInit, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DataService } from "../data.service";
import { LoginService } from "../../services/login.service";
import { UploadService } from "../../services/upload.service";
import { ShareService } from "../../services/share.service";

@Component({
  selector: "app-data",
  templateUrl: "./data.component.html",
  styleUrls: ["./data.component.css"],
  providers: [
    DataService,
    LoginService,
    FormBuilder,
    UploadService,
    ShareService,
  ],
})
export class DataComponent implements OnInit {
  public dirs: [any];
  public files: [any];
  public pathDirOpen: string;
  public dirParam: string;
  public arrayPath: any;
  public positionLasFolder: any;
  public isHome: boolean;

  public cD: boolean;
  public upload: boolean;
  public nameNewDir: string;
  public actualDir: string;
  public errorDir: boolean;
  public panelShare: boolean;
  public shareResult: string;
  public errUpload: boolean;
  public tokenDecoded: any;

  public filterPost: string;
  public posts: [];
  public actualDirData: any;

  form: FormGroup;

  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private shareService: ShareService
  ) {
    this.form = this.fb.group({
      name: [""],
      avatar: [null],
    });
    this.filterPost = "";
  }

  ngOnInit(): void {
    this.getData();
    this.cD = false;
    this.errorDir = false;
    this.errUpload = false;
    this.upload = false;
    this.loginService.checkToken();

    this.tokenDecoded = this.loginService.decodeToken();

    this.getDataUsers();
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file,
    });
    this.form.get("avatar").updateValueAndValidity();
  }

  submitForm() {
    let formData: any = new FormData();
    formData.append("avatar", this.form.get("avatar").value);
    this.uploadService.upload(this.dirParam, formData).subscribe(
      (response) => {
        this.router.navigate(["/link/mine/" + this.dirParam]);
      },
      (err) => {
        console.log(err);
        this.errUpload = true;
      }
    );
  }
  public getData(): any {
    this.transformDir();
    this.dataservice.getData(this.dirParam).subscribe(
      (response) => {
        this.dirs = response.carpetas;
        this.files = response.archivos;
        this.files.forEach((element) => {
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
        this.pathDirOpen = response.dirPath;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public transformDir() {
    this.route.params.subscribe((params: Params) => {
      this.dirParam = params.dir;
    });
    if (this.dirParam === "home") {
      this.isHome = true;
    } else {
      this.isHome = false;
    }
  }

  public goUpDir() {
    this.transformDir();
    this.arrayPath = this.dirParam.split("-");
    this.arrayPath.pop();
    this.dirParam = "";
    for (const element of this.arrayPath) {
      console.log(element);
      if (this.dirParam === "") {
        this.dirParam += element;
      } else {
        this.dirParam += "-" + element;
      }
      this.dirParam.slice(0, 3);
    }
    if (this.dirParam === "") {
      this.router.navigate(["link/mine/home"]);
    } else {
      this.router.navigate(["link/mine/" + this.dirParam]);
    }
  }

  public dirClick(newDir: string) {
    this.transformDir();
    if (this.dirParam.includes("home")) {
      this.router.navigate(["link/mine/" + newDir]);
    } else {
      this.dirParam = this.dirParam.concat("-" + newDir);
      this.router.navigate(["link/mine/" + this.dirParam]);
    }
  }

  public createDir() {
    this.route.params.subscribe((params: Params) => {
      this.actualDir = params.dir;
    });
    if (this.nameNewDir === undefined) {
      this.errorDir = true;
    } else {
      this.dataservice.createDir(this.actualDir, this.nameNewDir).subscribe(
        (response) => {
          if (response.ok === true) {
            this.router.navigate(["link/mine/" + this.actualDir]);
          } else {
            this.errorDir = true;
          }
        },

        (err) => {
          this.errorDir = true;
        }
      );
    }
  }

  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    console.log(file);
  }

  public showHideCreateDir() {
    if (this.cD === true) {
      this.cD = false;
    } else {
      this.cD = true;
    }
  }
  public showHideUpload() {
    if (this.upload === true) {
      this.upload = false;
    } else {
      this.upload = true;
    }
  }

  public panelShareShow() {
    if (this.panelShare === true) {
      this.panelShare = false;
    } else {
      this.panelShare = true;
    }
  }
  public shareResultShow() {
    if (this.shareResult === "true") {
      this.shareResult = "false";
    } else {
      this.shareResult = "true";
    }
  }

  getDataActualDir() {
    let aD = this.dirParam.split("-");
    let actualDir = "";
    if (aD.length === 1) {
      actualDir = "home";
    } else {
      aD.pop();
      aD.forEach((element) => {
        console.log(element);
        actualDir.concat(element);
      });
    }
    let dirsPast;
    this.dataservice.getData(actualDir).subscribe(
      (response) => {
        dirsPast = response.carpetas;
        console.log(dirsPast);
        let dirToShare = dirsPast.filter(
          (element) => element.nombre == this.dirParam
        );
        this.actualDirData = dirToShare[0];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getDataUsers() {
    this.loginService.getAllUsers().subscribe(
      (response: { ok; usarios }) => {
        let users = response.usarios;
        let positionMe = this.loginService.decodeToken();
        positionMe = positionMe.usuario._id;

        var filtered = users.filter(function (value, index, arr) {
          return value._id != positionMe;
        });
        this.posts = filtered;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  async shareFolder(idUser: string) {
    console.log(this.dirParam);
    let aD = this.dirParam.split("-");
    let actualDir = "";
    if (aD.length === 1) {
      actualDir = "home";
    } else {
      aD.pop();
      aD.forEach((element) => {
        if (actualDir === "") {
          actualDir += element;
        } else {
          actualDir += "-" + element;
        }
      });
    }

    let dirsPast;
    this.dataservice.getData(actualDir).subscribe(
      (response) => {
        dirsPast = response.carpetas;
        let nD = this.dirParam.split("-");
        let dirToShare = dirsPast.filter(
          (element) => element.nombre == nD[nD.length - 1]
        );
	console.log(dirToShare)
	dirToShare = dirToShare[0]
        this.shareService.shareDir(dirToShare._id, idUser).subscribe(
          (r) => {
            console.log(r);
            this.panelShare = false;
            this.shareResult = "true";
          },
          (e) => {
            console.log(e);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public deleteDir() {
    let aD = this.dirParam.split("-");
    let actualDir = "";
    if (aD.length === 1) {
      actualDir = "home";
    } else {
      aD.pop();
      aD.forEach((element) => {
        if (actualDir === "") {
          actualDir += element;
        } else {
          actualDir += "-" + element;
        }
      });
    }
    let dirsPast;
    this.dataservice.getData(actualDir).subscribe(
      (response) => {
        dirsPast = response.carpetas;
        let nD = this.dirParam.split("-");
        let dirToShare = dirsPast.filter(
          (element) => element.nombre == nD[nD.length - 1]
        );
        dirToShare = dirToShare[0];
        this.dataservice.deleteDir(dirToShare._id).subscribe(
          (response) => {
            console.log(response);
            if (response.ok === true) {
              this.goUpDir();
            }
          },
          (err) => {
            console.log(err);
          }
        );
        console.log(dirToShare);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
