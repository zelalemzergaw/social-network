import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from "../../../../../services";
import { Post } from "../../../../../models";
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  allusers = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService._getAllUsers().pipe(first())
        .subscribe(respose => {
          this.allusers = respose.result;
        })
  }
  follow(id) {
    console.log("About to follow", id);
  }

}
