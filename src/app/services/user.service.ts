import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetailResponse } from '../model/response/user-detail-response';
import { UserRequest } from '../model/request/user-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8080/blogs/users';

  constructor(public http: HttpClient) { }

  // Signup method
  public createUser(user: UserRequest): Observable<UserDetailResponse> {
    console.log(user);
    return this.http.post<UserDetailResponse>(this.url, user);
  }

  // login method


  // get user
  public getUser(userEmail: string): Observable<UserDetailResponse> {
    return this.http.get<UserDetailResponse>(`http://localhost:8080/blogs/users/${userEmail}`);
  }
}
