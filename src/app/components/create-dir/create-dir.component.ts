import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-create-dir',
  templateUrl: './create-dir.component.html',
  styleUrls: ['./create-dir.component.css'],
  providers: [DataService]
})
export class CreateDirComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
