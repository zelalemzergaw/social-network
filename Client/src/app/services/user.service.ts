import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Post } from '../models';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../util';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser:any;
  allUsers = [];
  constructor(private http: HttpClient) { 

  }

  getUserById(id) {
    return this.http.get<ApiResponse>(environment.API_URL + "/api/users/" + id);
  }

  signup(user: User){
     return this.http.post<ApiResponse>(environment.API_URL + "/api/auth/signup", user);
  }

  setCurrentUser(user) {
    this.currentUser = user;
  }
  getCurrrentUser() {
    return this.currentUser;
  }

  createPost(post: Post) {
      return this.http.post<ApiResponse>(environment.API_URL + "/api/user/create-post", post);
  }
  _getAllUsers() {
    return this.http.get<ApiResponse>(environment.API_URL + "/api/users");
  }

  getAllUsers() {
    return this.allUsers;
  }

  follow(id) {
    return this.http.post<ApiResponse>(environment.API_URL + "/api/user/follow/"+ id, {});
  }
  fetchFeed() {
    return this.http.get<ApiResponse>(environment.API_URL + "/api/user/feetch-feeds");
  }

  addComment(postId, data) {
    return this.http.post<ApiResponse>(environment.API_URL + "/api/user/add-comment/" + postId, {text: data});
  }

  likePost(postId) {
    return this.http.post<ApiResponse>(environment.API_URL + "/api/user/like-post/" + postId, {});
  }

  unLikePost(postId) {
    return this.http.post<ApiResponse>(environment.API_URL + "/api/user/unlike-post/" + postId, {});
  }
  
  
  
}

