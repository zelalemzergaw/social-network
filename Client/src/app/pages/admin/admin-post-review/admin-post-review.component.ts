import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admin-post-review',
  templateUrl: './admin-post-review.component.html',
  styleUrls: ['./admin-post-review.component.scss']
})
export class AdminPostReviewComponent implements OnInit {

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
  }

  approvePost(post){
    this.adminService.approvePost(post)
                     .pipe(first())
                     .subscribe(response=>{
                       if(response.status === 501){
                         
                       }else{
                         //show flagged post?
                       }
                     });
    
  }

  rejectPost(post){
    this.adminService.rejectPost(post)
                     .pipe(first())
                     .subscribe(response=>{
                        if(response.status === 501){
                          
                        }else{
                          //show flagged post?
                        }
                      });
  }






}
