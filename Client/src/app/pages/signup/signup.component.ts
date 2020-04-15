import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from "../../services";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  error = "";
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService:UserService,
    private authService: AuthenticationService
  ) {
     if (this.authService.isUserAuthenticated()) {
       this.router.navigate(["/"]);
     }

     this.signupForm = this.formBuilder.group({
        username:  ['', Validators.required],
        firstname: ['', Validators.required],
        lastname:  ['', Validators.required],
        birthdate: ['', Validators.required],
        location:  ['', Validators.required],
        email:     ['', Validators.required],
        password:  ['', Validators.required]
     });
  }

  getF() {
    return this.signupForm.controls;
  }
  
  onSubmit() {
    this.submitted = true;
    if(this.signupForm.invalid) return;

    this.loading = true;
    this.userService.signup(this.signupForm.value)
        .pipe(first())
        .subscribe(
          data => {
            if(data.status == 401) {
              this.error = data.message;
            }
            else {
              this.router.navigate(['/login']);
            }
           
          },
          error => {
            this.loading = false;
          }
        );


  }

  ngOnInit(): void {
  }

}
