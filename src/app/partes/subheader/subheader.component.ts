import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent implements OnInit {
  subtitulo:string;
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params)=>{
      this.subtitulo=params['title'];
   });
  }

}
