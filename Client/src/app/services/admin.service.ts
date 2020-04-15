import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Advertisement } from '../models';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../util';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

getBadWords(){
  return this.http.get<ApiResponse>(environment.API_URL+'/api/admin/get-bad-words');

}
updateBadWords(allBwords:Array<String>){
  return this.http.post<ApiResponse>(environment.API_URL+'/api/admin/update-bad-word',allBwords);

}
addBadWord(newBadword:String){
  return this.http.post<ApiResponse>(environment.API_URL+'/api/admin/add-bad-word',newBadword); 
}


}
