import { Component, OnInit , ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss']
})
export class UserFeedComponent implements OnInit {
  post = "";
  customStyle = {
    selectButton: {
      // "background-color": "yellow",
      // "background-image":"url(assets/img/pic.png)",
      "border-radius": "10px",
      "z-index": "10",
      "opacity": "1",
      "color": "#000",
      "font-size": "7px"
    },
    clearButton: {
      "background-color": "#FFF",
      "border-radius": "25px",
      "color": "#000",
      "margin-left": "10px",
      "opacity": "1",
    },
    layout: {
      // "background-color": "yello",
      "border-radius": "0px",
      "color": "#FFF",
      "font-size": "15px",
      "margin": "0px",
      // "padding-top": "5px",
      "width": "500px"
    },
    previewPanel: {
      "background-color": "white",
      "border-radius": "0 0 25px 25px",
    }
  }

  constructor() { }
  browse() {
    console.log("slfsadfasdsfasdf");
  }

  onUploadFinished(file:any) {
  console.log(file);
}

  ngOnInit(): void {
  }



}
