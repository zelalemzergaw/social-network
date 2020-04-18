import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from "../../services";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loading = false;
  submitted = false;
  status = "";
  error = "";
  email = "";
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService:UserService,
    private authService: AuthenticationService
  ) {
    
  }
  
  forgetPassword() {
    this.loading = true;
    this.submitted = true;
    this.authService.forgotPassword(this.email).subscribe(response => {
      this.loading = false;
      if(response.status == 200) {
        this.status = response.result.message;
        
      }
      else {
        error: response.result.err;
      }
    })
    

  }

  ngOnInit(): void {
  }

}
