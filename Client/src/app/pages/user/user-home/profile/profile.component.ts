import { Component, OnInit } from '@angular/core';
import { UserService, AuthenticationService } from 'src/app/services';
import { User } from 'src/app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  changeProfileForm: FormGroup;
  loading = false;
  submitted = false;
  error = "";
  user: User;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService:UserService, private authService: AuthenticationService) {
    this.user = this.userService.getCurrrentUser();
     this.changeProfileForm = this.formBuilder.group({
        firstname: [this.user.firstname, Validators.required],
        lastname:  [this.user.lastname, Validators.required],
        birthdate: [new DatePipe('en-US').transform(this.user.birthdate, 'dd/MM/yyyy'), Validators.required],
        location:  [this.user.location, Validators.required],
        email:     [this.user.email, Validators.required],
     });
  }

  getF() {
    return this.changeProfileForm.controls;
  }
  
  onSubmit() {
    let data = this.changeProfileForm.value;
    this.user.firstname = data.firstname;
    this.user.lastname = data.lastname;
    this.user.email = data.email;
    this.user.location = data.location;
    this.user.birthdate = data.birthdate;
    this.submitted = true;
    if(this.changeProfileForm.invalid) return;

    this.loading = true;
    this.userService.updateUser(this.user)
        .pipe(first())
        .subscribe(
          data => {
            if(data.status == 401) {
              this.error = data.message;
            }
            else {
              this.router.navigate(['/']);
            }
            this.userService.setCurrentUser(this.user);

           
          },
          error => {
            this.loading = false;
          }
        );


  }

  ngOnInit(): void {
    this.userService.getUserById(this.user._id).subscribe(res => {
      this.user = res.result;
    })
  }

}