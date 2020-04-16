import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent implements OnInit {
  feeds = [];
  currentUser;
  constructor(private userService: UserService) {
      this.currentUser = this.userService.getCurrrentUser();
  }
  ngOnInit(): void {
     this.fetchPostFeeds();
  }

  fetchPostFeeds() {
    this.userService.getPosts().pipe(first())
    .subscribe(respose => {
      this.feeds = respose.result;
    }, err => {
      console.log(err);
    })
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
       this.userService.unLikePost(id).subscribe(response => {
           this.feeds[index].likes.splice(l_index, 1);
       })
    }
    else {
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
