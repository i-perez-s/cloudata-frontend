import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { LoginService } from "../../services/login.service";
import { Global } from "../../config";
import { UploadService } from "../../services/upload.service";
import { ShareService } from "../../services/share.service";

@Component({
  selector: "app-file",
  templateUrl: "./file.component.html",
  styleUrls: ["./file.component.css"],
  providers: [DataService, LoginService, UploadService, ShareService],
})
export class FileComponent implements OnInit {
  public id: string;
  public token: string;
  public url: string = Global.url;
  public apiRoute: string;
  public dataFile: any;
  public typeData: string;
  public dataText: any;
  public pathFile: any;
  public path: string;
  public panelShare: boolean;
  public filterPost: string = "";
  public posts: [];
  shareOrMine: any;
  public creator: string;

  public shareResult: string;

  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private shareService: ShareService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.loginService.checkToken();
    this.getData();
  }

  public getData() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      if (params.type === "shared") {
        this.shareOrMine = "shared";
      } else {
        this.shareOrMine = "mine";
      }
    });
    this.token = this.loginService.getToken();
    this.apiRoute = `${this.url}getMediaFile/${this.id}?token=${this.token}`;
    this.loginService.getDataFile(this.id).subscribe(
      (response) => {
        this.getDataUsers();
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

  public showShare() {
    if (this.panelShare === true) {
      this.panelShare = false;
    } else {
      this.panelShare = true;
    }
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
        if (this.shareOrMine === "shared") {
          let creatorId = this.dataFile.creator;
          console.log(creatorId);
          var creatorUser = users.filter(function (value, index, arr) {
            return value._id === creatorId;
          });
          this.creator = creatorUser[0].email;
	  console.log(this.creator)
        }
        this.posts = filtered;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public clickUserToShare(idUser: string) {
    console.log(idUser);
    this.panelShare = false;

    this.shareService.shareFile(this.id, idUser).subscribe(
      (response) => {
        if (response.ok === true) {
          this.shareResult = "true";
        } else {
          this.shareResult = "false";
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public deleteFile() {
    this.dataservice.deleteFile(this.id).subscribe(
      (response) => {
        this.router.navigate(["/cloudData/" + this.path]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public goUp() {
    console.log();
    this.router.navigate([
      "/compartidoConmigo/" + this.shareService.getLastId(),
    ]);
  }
}
