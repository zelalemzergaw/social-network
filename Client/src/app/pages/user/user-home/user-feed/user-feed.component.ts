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
     this.fetchPostFeeds();
  }

  fetchPostFeeds() {
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
           this.post.createdAt = Date.now();
           this.post.likes = [];
           this.feeds.unshift(this.post);
         })
    console.log("NEW", this.post);

  }

  initPost(){
    console.log("FEED",this.userService.getCurrrentUser());
    this.post.postedBy = this.userService.getCurrrentUser()._id;
  }

  comment(text, id) {
    this.userService.addComment(id, text)
        .subscribe(respose => {
          console.log("COMMENT RESPONSE", respose);
          let i = this.feeds.findIndex(f => f._id == id);
          let c = {
            text: text,
            commentedBy: this.userService.getCurrrentUser(),
            createdAt: Date.now()
          };
          this.feeds[i].comments.push(c);
        })
  }
 isLiked(id) {
  let index = this.feeds.findIndex(f => f._id == id);
  if(index < 0 || !this.feeds[index].likes) {
    return "black";
  }
  let l_index = this.feeds[index].likes.findIndex(l => l.likedBy == this.userService.getCurrrentUser()._id);
  return l_index > -1 ? "blue": "black";
  
 }

  like(id) {
    let index = this.feeds.findIndex(f => f._id == id);
    let l_index = this.feeds[index].likes.findIndex(l => l.likedBy == this.userService.getCurrrentUser()._id);
    if(l_index > -1) {
      // unlike
      console.log("UNLIKE")
       console.log(index, l_index, "INDEX");
       this.userService.unLikePost(id).subscribe(response => {
           this.feeds[index].likes.splice(l_index, 1);
       })
    }
    else {
      console.log("LIKE")
      this.userService.likePost(id).subscribe(response => {
        let i = this.feeds.findIndex(f => f._id == id);
        let l = {
          likedBy: this.userService.getCurrrentUser()._id,
        };
        this.feeds[i].likes.push(l);
      });
    }
    
  }





}
