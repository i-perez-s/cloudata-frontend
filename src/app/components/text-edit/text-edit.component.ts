import { Component, OnInit, Input } from "@angular/core";
import { UploadService } from "../../services/upload.service";

@Component({
  selector: "text-edit",
  templateUrl: "./text-edit.component.html",
  styleUrls: ["./text-edit.component.css"],
  providers: [UploadService],
})
export class TextEditComponent implements OnInit {
  @Input() dataText: any;
  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {
  } 



}
