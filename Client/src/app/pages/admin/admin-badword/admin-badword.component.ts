import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-badword',
  templateUrl: './admin-badword.component.html',
  styleUrls: ['./admin-badword.component.scss']
})
export class AdminBadwordComponent implements OnInit {
  badWordForm: FormGroup;
  loading = false;
  submitted = false;
  error = "";
  allBwords:any


  constructor(private adminService:AdminService, 
    private formBuilder: FormBuilder ) { 

        this.badWordForm = this.formBuilder.group({
          newBadWord:['',Validators.required]
        });
    }
  ngOnInit(): void {
      this.adminService.getBadWords().pipe(first())
                               .subscribe(badword =>{
           this.allBwords = badword.result; 
          });
 }
 onSubmit(){
  this.submitted = true;
  if(this.badWordForm.invalid) return;
  this.adminService.addBadWord(this.badWordForm.value)
                  .pipe(first())
                  .subscribe(
                    data=>{
                      if(data.status ===401){
                        this.error = data.message;
                      }
                      else{
                        this.allBwords= data.result.badwords;
                      }

                    }
                  );

   
 }
 onRemoveBadWord(index:number){
   this.allBwords.splice(index,1);
console.log('INSIDE REMOVE',this.allBwords)
   this.adminService.updateBadWords(this.allBwords)
                        .pipe(first())
                        .subscribe(
                          data=>{
                            if(data.status ===401){
                              this.error = data.message;
                            }
                            else{
                              this.allBwords= data.result.badwords;
                            }
      
                          }
                        )
 }


}
