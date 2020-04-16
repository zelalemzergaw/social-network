import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-followings',
  templateUrl: './followings.component.html',
  styleUrls: ['./followings.component.scss']
})
export class FollowingsComponent implements OnInit {
    
  myFollowings = [];
  currentUser: User;
  constructor(private userService: UserService) { 
     
  }

  ngOnInit(): void {
    this.userService.getFollwings().pipe(first())
            .subscribe(response => {
                this.myFollowings = response.result;
                this.currentUser = this.userService.getCurrrentUser();
                console.log(this.myFollowings);
            })

  }
  follow(id) {
     this.userService.follow(id).pipe(first())
         .subscribe(response => {
          const i = this.myFollowings.findIndex(user => user._id == id);
          const u = this.myFollowings[i];
          u.followers.push({"followerID": this.currentUser});
          this.currentUser.following.push({"followerID": id});
          this.myFollowings[i] = u;
         });
  }

  unfollow(id) {
    this.userService.unFollow(id).pipe(first())
        .subscribe(response => {
          const i = this.myFollowings.findIndex(user => user._id == id);
          const index = this.myFollowings[i].followers.findIndex(f => f.followerID == this.userService.getCurrrentUser()._id);
          if(index > -1) {
            this.myFollowings[i].followers.splice(index, 1);
          }
          const index2 = this.currentUser.following.findIndex(f => f.followerID == id);
          this.currentUser.following.splice(index2, 1);
    });
  }

  isFollwed(id) {
    return this.currentUser.following.findIndex(f => f.followerID == id) > -1;

  }

}
