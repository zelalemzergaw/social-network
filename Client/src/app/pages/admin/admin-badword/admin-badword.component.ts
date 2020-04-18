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
  showMeBadWords = false;
  buttonName =['Show bad words','Hide bad words']; 
  nameIndex = 0;
  error = "";
  allBwords:Array<string>;

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
                                  console.log(this.allBwords)
          });
 }
 onAddNewBadWord(){
  this.submitted = true;
  if(this.badWordForm.invalid) return;
  this.adminService.addBadWord(this.badWordForm.value)
                  .pipe(first())
                  .subscribe(
                    data=>{
                      console.log(data.result);
                      console.log(data)
                      if(data.status ===401){
                        this.error = data.message;
                      }
                      else{
                        this.allBwords = data.result.badwords
                      }

                    }
                  );

   
 }
 onRemoveBadWord(index){ 
  this.allBwords.splice(index,1);
   this.adminService.updateBadWords(this.allBwords)
                        .pipe(first())
                        .subscribe(
                          response=>{
                            if(response.status ===401){
                              this.error = response.message;
                            }
                            else{
                              this.allBwords= response.result.badwords;
                            }
      
                          }
                        )
 }
 toggleBadWords(){
   if(!this.showMeBadWords){
     this.showMeBadWords = true;
     this.nameIndex =1;
   }
   else{
     this.showMeBadWords = false; 
     this.nameIndex = 0;
   }

 }

}
