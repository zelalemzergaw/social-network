import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from "../../../../services";
import { User } from 'src/app/models';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {
  currentUser: User;
  constructor(private userService: UserService, private authService: AuthenticationService) {
    this.currentUser = this.authService.getCurrentUser();
   }

  ngOnInit(): void {
  }

}
