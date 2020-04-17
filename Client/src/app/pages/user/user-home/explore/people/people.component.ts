import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from "../../../../../services";
import { Post, User } from "../../../../../models";
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  allusers = [];
  currentUser: User;
  constructor(private userService: UserService) { 
     
  }

  ngOnInit(): void {
     this.initUsers();
  }

  initUsers() {
    this.userService._getAllUsers().pipe(first())
        .subscribe(respose => {
          this.currentUser = this.userService.getCurrrentUser();
          this.allusers = respose.result.filter(u => u._id !== this.currentUser._id);
        });
  }

  follow(id) {
     this.userService.follow(id).pipe(first())
         .subscribe(response => {
          const i = this.allusers.findIndex(user => user._id == id);
          const u = this.allusers[i];
          u.followers.push({"followerID": this.currentUser});
          this.currentUser.following.push({"followerID": id});
          this.allusers[i] = u;
          this.userService.followers.next();
          this.userService.followings.next();
         });
  }

  unfollow(id) {
    this.userService.unFollow(id).pipe(first())
        .subscribe(response => {
          const i = this.allusers.findIndex(user => user._id == id);
          const index = this.allusers[i].followers.findIndex(f => f.followerID == this.userService.getCurrrentUser()._id);
          if(index > -1) {
            this.allusers[i].followers.splice(index, 1);
          }
          const index2 = this.currentUser.following.findIndex(f => f.followerID == id);
          this.currentUser.following.splice(index2, 1);
          this.userService.followers.next();
          this.userService.followings.next();
    });
  }

  isFollwed(id) {
    return this.currentUser.following.findIndex(f => f.followerID == id) > -1;

  }

}
