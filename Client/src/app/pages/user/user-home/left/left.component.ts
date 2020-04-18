import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from "../../../../services";
import { User } from 'src/app/models';
import { FileUploader } from 'ng2-file-upload';
import  { environment } from '../../../../../environments/environment';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {
  currentUser: User;
  url = "";
  public searchResults:any;
  public uploader: FileUploader;
  private hasDragOver = false;
  constructor(private userService: UserService, private authService: AuthenticationService) {
    this.currentUser = this.authService.getCurrentUser();
    if(this.currentUser.photo) {
       this.url = this.userService.getCurrrentUser().photo;
    }
    this.uploader = new FileUploader({
      url: environment.API_URL +"/api/uploads/profile-image",
      method: "POST",
      autoUpload: true,
      disableMultipart: false,
      headers: [{name:'Accept', value:'application/json'}]
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      };
    this.uploader.response.subscribe(res => {
  
      this.url = environment.API_URL.toString() + "/" + JSON.parse(res);
      this.userService.changeProfilePic(this.url).pipe(first()).subscribe(res => {
        console.log(res);
        this.currentUser.photo = this.url;
        this.userService.setCurrentUser(this.currentUser);
      });
    });
   }
   public fileOver(e: any): void {
    this.hasDragOver = e;
  }
  searchPost(textToSearch){
    this.userService.searchPosts(textToSearch).pipe(first())
                                              .subscribe(res=>{
                                                this.searchResults = res.result;
                                              });
  }
  ngOnInit(): void {
  }
}