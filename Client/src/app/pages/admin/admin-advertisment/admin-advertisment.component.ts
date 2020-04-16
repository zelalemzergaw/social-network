import { Component, OnInit } from '@angular/core';
import { FileHolder, UploadMetadata } from 'angular2-image-upload';


@Component({
  selector: 'app-admin-advertisment',
  templateUrl: './admin-advertisment.component.html',
  styleUrls: ['./admin-advertisment.component.scss']
})
export class AdminAdvertismentComponent implements OnInit {
  customStyle = {
    selectButton: {
      "background-color": "white",
      "border-radius": "25px",
      "color": "#000"
    },
    clearButton: {
      "background-color": "#FFF",
      "border-radius": "25px",
      "color": "#000",
      "margin-left": "10px"
    },
    layout: {
      "background-color": "white",
      "border-radius": "25px",
      "font-size": "15px",
      "margin": "2px",
      "padding-top": "5px",
      "width": "650px"
    },
    previewPanel: {
      "background-color": "#F1F7FC",
      "border-radius": "0 0 25px 25px",
    }
  }
  imageUrl:String; 

  constructor() { }
  ngOnInit(): void {
    
  }
  onUploadFinished(file: FileHolder) {
    this.imageUrl = "http://localhost:3000/"+file.serverResponse.response.body; 
    console.log(this.imageUrl);
  }
  onRemoved(file: FileHolder) {
  
    file
    console.log(file);
  }


}
