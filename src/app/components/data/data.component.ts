import { Component, OnInit, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DataService } from "../data.service";
import { LoginService } from "../../services/login.service";
import { UploadService } from "../../services/upload.service";

@Component({
  selector: "app-data",
  templateUrl: "./data.component.html",
  styleUrls: ["./data.component.css"],
  providers: [DataService, LoginService, FormBuilder, UploadService],
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
  public errUpload: boolean;
  public tokenDecoded: any;

  form: FormGroup;

  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder,
    private uploadService: UploadService
  ) {
    this.form = this.fb.group({
      name: [""],
      avatar: [null],
    });
  }

  ngOnInit(): void {
    this.getData();
    this.cD = false;
    this.errorDir = false;
    this.errUpload = false;
    this.upload = false;
    this.loginService.checkToken();

    this.tokenDecoded = this.loginService.decodeToken();
    console.log(this.tokenDecoded);
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
        this.router.navigate(["/link/" + this.dirParam]);
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
        console.log(response);
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
      this.router.navigate(["link/home"]);
    } else {
      this.router.navigate(["link/" + this.dirParam]);
    }
  }

  public dirClick(newDir: string) {
    this.transformDir();
    if (this.dirParam.includes("home")) {
      this.router.navigate(["link/" + newDir]);
    } else {
      this.dirParam = this.dirParam.concat("-" + newDir);
      this.router.navigate(["link/" + this.dirParam]);
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
            this.router.navigate(["link/" + this.actualDir]);
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
}
