import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  public linkPlace: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.redirect();
  }

  public redirect(){
    this.route.params.subscribe((params: Params) => {
      this.linkPlace = params.link;
    });
    this.router.navigate(['cloudData/' + this.linkPlace]);
  }

}
