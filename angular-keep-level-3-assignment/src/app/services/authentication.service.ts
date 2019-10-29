import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {

  }

  authenticateUser(data) {
    return this.httpClient.post('http://localhost:8089/api/v1/auth/login', data,{responseType: 'text'});
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  setUserId(userid){
    localStorage.setItem("userId",userid);
  }

  getUserId(){
    return localStorage.getItem("userId");
  }

  isUserAuthenticated(token): Promise<boolean> {
    return this.httpClient.post('http://localhost:3000/auth/v1/isAuthenticated', {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).map((response) => response['isAuthenticated'])
      .toPromise();

  }

  register(userData){
    console.log("inside userData "+JSON.stringify(userData));
    return this.httpClient.post("http://localhost:8089/api/v1/auth/register",userData);
  }

  logoutUser(){
    localStorage.removeItem("userId");
    localStorage.removeItem("bearerToken");
  }
}
