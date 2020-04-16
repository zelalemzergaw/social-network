import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../../services";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
     this.authService.logout();
     this.router.navigate(['/login']);
  }

}
