import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  password = "";
  status = "";
  loading = false;
  constructor(private route: ActivatedRoute, private authService: AuthenticationService ) {
    console.log("REEEEEEEEEE", this.route.snapshot.params.token);
   }
      
  ngOnInit(): void {
  }

  changePassword() {
    console.log("called", this.password);
    this.loading = true;
    this.authService.newPassword({token: this.route.snapshot.params.token, password: this.password}).subscribe(resu => {
      console.log("nothing.....");
        this.status = resu.result.message;
        this.loading = false;
    }, err => {
      console.log(err);
    });
  }

}
