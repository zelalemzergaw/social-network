import { Component, OnInit , ViewChild } from '@angular/core';
import { AuthenticationService, UserService } from "../../../../services";
import { Post } from "../../../../models";
import { tick } from '@angular/core/testing';
import  { environment } from '../../../../../environments/environment';
import { FileHolder, UploadMetadata } from 'angular2-image-upload';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss']
})
export class UserFeedComponent implements OnInit {
  post_status: boolean = false;
  post_message: "";
  post: Post = new Post();
  API_URL: string = environment.API_URL;
  IMG_UPLOD_URL = this.API_URL + "/api/uploads/profile-image";
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
  feeds = [];
  constructor(private userService: UserService) {
    console.log("constructor of Feed component", this.IMG_UPLOD_URL);

  }
  ngOnInit(): void {
    this.initPost();
    this.userService.fetchFeed().pipe(first())
        .subscribe(respose => {
          this.feeds = respose.result;
          console.log("WOOOW my feeds", respose.result);
        }, err => {
          console.log(err);
        })
  }

  onUploadFinished(file: FileHolder) {
    this.post.images.push(this.API_URL + "/"+file.serverResponse.response.body); 
  }

  createPost(){
    this.userService.createPost(this.post).pipe(first())
         .subscribe(response => {
           if(response.status === 200) {
             this.post_status = true;
           }
           this.post.postedBy = this.userService.getCurrrentUser();
           this.feeds.unshift(this.post);
         })
    console.log("NEW", this.post);

  }

  initPost(){
    console.log("FEED",this.userService.getCurrrentUser());
    this.post.postedBy = this.userService.getCurrrentUser()._id;
  }





}
