import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from "../../../services";
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  currentUser: any;
  constructor( private authService: AuthenticationService, private userService: UserService) {
        this.currentUser = authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.userService.getUserById(this.currentUser._id).pipe(first())
        .subscribe(user => {
          this.userService.setCurrentUser(user.result);
            console.log(user.result);
        })
  }

}
