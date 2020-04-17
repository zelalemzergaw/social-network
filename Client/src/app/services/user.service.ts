import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Post } from '../models';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../util';
import { first } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser:any;
  allUsers = [];
  private socket: WebSocket;
  public peopleFollow = new Subject<any>();
  public followers = new Subject<any>();
  public followings = new Subject<any>();

  public postSubject = new Subject<any>();

  // public notificationSubject = new BehaviorSubject<any>();
  

  constructor(private http: HttpClient, private authService: AuthenticationService) { 
    this.connect();
    console.log("MOTHER FUCKER", this.authService.getCurrentUser());
  }

  private connect() {
      this.socket = new WebSocket(environment.API_SOCKET_URL);
      this.socket.onopen = (event) => {
          this.socket.send(JSON.stringify({token: this.getCurrrentUser().access_token}));
      }

      this.socket.onmessage = (event) => {
        this.postSubject.next();
        console.log(event.data, 'FROM SERVER');
      }

  }
  

  getUserById(id) {
    return this.http.get<ApiResponse>(environment.API_URL + "/api/users/" + id);
  }

  signup(user: User){
     return this.http.post<ApiResponse>(environment.API_URL + "/api/auth/signup", user);
  }

  setCurrentUser(user:User) {
    this.currentUser = user;
    let c = JSON.parse(localStorage.getItem('currentUser'));
    user.access_token = c.access_token;
    localStorage.setItem('currentUser', JSON.stringify(user));
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

  unFollow(id) {
    return this.http.post<ApiResponse>(environment.API_URL + "/api/user/unfollow/"+ id, {});
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
  
  getPosts() {
    return this.http.get<ApiResponse>(environment.API_URL + "/api/user/posts");
  }

  getFollowers() {
    return this.http.get<ApiResponse>(environment.API_URL + "/api/user/followers");
  }

  getFollwings() {
    return this.http.get<ApiResponse>(environment.API_URL + "/api/user/followings");
  }

  changeProfilePic(pic) {
    return this.http.post<ApiResponse>(environment.API_URL + "/api/user/change-pic", {pic: pic});
  }



  
  
}

