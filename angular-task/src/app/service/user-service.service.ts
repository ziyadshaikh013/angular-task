import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  signup(data){
    return this.http.post(`${environment.ApiUrl}/api/user/adduser`, data);
  }

  login(data){
    return this.http.post(`${environment.ApiUrl}/api/user/login`, data);
  }

  getAllUsers(){
    return this.http.get(`${environment.ApiUrl}/api/user`);
  }

  getUser(id){
    return this.http.get(`${environment.ApiUrl}/api/user/${id}`);
  }

  sendRequest(id, data){
    return this.http.patch(`${environment.ApiUrl}/api/user/${id}`, data);
  }

  acceptRequest(id){
    return this.http.patch(`${environment.ApiUrl}/api/request/${id}`, null);
  }
}