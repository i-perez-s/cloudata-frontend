import { Component, OnInit } from "@angular/core";
import { UploadService } from "../../services/upload.service";

@Component({
  selector: "text-edit",
  templateUrl: "./text-edit.component.html",
  styleUrls: ["./text-edit.component.css"],
  providers: [UploadService]
})
export class TextEditComponent implements OnInit {
  public dataText: string;

  constructor(
      private uploadService: UploadService
  ) {}

  ngOnInit(): void {
      this.dataText = this.uploadService.getDataText();
      console.log(this.dataText)
  }

}
