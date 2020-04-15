import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from "../../../../services";
import { Post } from "../../../../models";
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  allUsers: any[];
  constructor(private userService: UserService) { 
     
  }

  ngOnInit(): void {
     this.allUsers = this.userService.getAllUsers().filter(u => u._id !== this.userService.getCurrrentUser()._id);
  }

  

}
