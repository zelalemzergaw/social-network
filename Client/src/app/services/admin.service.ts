import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
addBadWord(newBadword){
  return this.http.post<ApiResponse>(environment.API_URL+'/api/admin/add-bad-word',newBadword); 
}

getAllAdvertisements(){

  return this.http.get<ApiResponse>(environment.API_URL+'/api/admin/get-all-advertisements');
}
deleteAdvertisement(thisAdvert:Advertisement){

  return this.http.post<ApiResponse>(environment.API_URL+'/api/admin/delete-ad',thisAdvert);
}
creatAdvertisement(newAdvertisement:Advertisement){

  return this.http.post<ApiResponse>(environment.API_URL+'/api/admin/create-ad',newAdvertisement);
}
approvePost(post){

return this.http.post<ApiResponse>(environment.API_URL+'api/admin/approve-post',post);
}
rejectPost(post){

  return this.http.post<ApiResponse>(environment.API_URL+'api/admin/reject-post',post);
}
activateAccount(account){

  return this.http.post<ApiResponse>(environment.API_URL+'api/admin/activate-user-account',account);
}
getDeactivatedAccounts(){

  return this.http.get<ApiResponse>(environment.API_URL+'/api/admin/get-deactivated-account');
}


}
