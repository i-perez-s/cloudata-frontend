import { Component, OnInit,  } from "@angular/core";
import { DataService } from "../data.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { LoginService } from "../../services/login.service";
import { Global } from "../../config";
import { UploadService } from "../../services/upload.service";

@Component({
  selector: "app-file",
  templateUrl: "./file.component.html",
  styleUrls: ["./file.component.css"],
  providers: [DataService, LoginService, UploadService],
})
export class FileComponent implements OnInit {
  public id: string;
  public token: string;
  public url: string = Global.url;
  public apiRoute: string;
  public dataFile: any;
  public typeData: string;
  public dataText: string;
  public pathFile: any;
  public path: string;
  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  public getData() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.token = this.loginService.getToken();
    this.apiRoute = `${this.url}getMediaFile/${this.id}?token=${this.token}`;
    this.loginService.getDataFile(this.id).subscribe(
      (response) => {
        this.dataFile = response.filedb;
        let termination = this.dataFile.nombre.split(".");
        termination = termination[termination.length - 1];
        let extImg = ["jpg", "jpeg", "png", "JPG"];
        let extVid = ["mp4", "m4a"];
        let extAud = ["mp3", "wav"];
        if (extImg.includes(termination)) {
          this.typeData = "img";
        } else if (extVid.includes(termination)) {
          this.typeData = "video";
        } else if (extAud.includes(termination)) {
          this.typeData = "audio";
        } else {
          this.typeData = "text";
          this.dataservice.getTextContent(this.id).subscribe(
            (response) => {
              this.dataText = response.data;
	      this.uploadService.setDataText(this.dataText)
            },
            (err) => {
              console.log(err);
            }
          );
        }
        this.pathFile = response.filedb.path.split(Global.uploadPath);
        this.pathFile.shift();
        this.pathFile = this.pathFile[0];
        this.pathFile = this.pathFile.split("\\");
        if (this.pathFile.length == 1) {
          this.path = "home";
        } else {
          this.pathFile.shift();
          console.log(this.pathFile);
          this.path = "";
          this.pathFile.forEach((element) => {
            if (this.path == "") {
              this.path = element;
            } else {
              this.path += "-" + element;
            }
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
