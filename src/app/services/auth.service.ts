import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRequest } from '../model/request/user-request';
import { UserDetailResponse } from '../model/response/user-detail-response';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject, Observable } from 'rxjs';
import { UserLoginRequestModel } from '../user/user-login-request-model';
import { User } from '../model/response/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  // signup method
  signUp(user: UserRequest) {
    const url = 'http://localhost:8080/blogs/users';
    return this.http.post<UserDetailResponse>(url, user)
      .pipe(
        catchError(backedError => {
          const uibackedErrorError = backedError.error.message;
          return throwError(uibackedErrorError);
        })
      );

  }
  // login service
  signIn(user: UserLoginRequestModel) {
    console.log('Login details are' + user.email);
    // console.log('Login details are' + user.password);
    const url = 'http://localhost:8080/blogs/users/login';
    return this.http.post<any>(url, user, { observe: 'response' }).pipe(
      catchError(backendLoginError => {
        const uiLoginError = 'Wrong Username or Password';
        return throwError(uiLoginError);
      }), tap(resData => {
        /* Assigining the loggedin data to a obserable so that it can be subscribed*/
        const userId = resData.headers.get('USER_ID');
        const authorization = resData.headers.get('Authorization');
        const tokenExp = resData.headers.get('TOKEN_EXPIRATION');
        const tokenExpNumber = Number.parseInt(tokenExp, 10);
        const tokenExpirationDate = new Date(new Date().getTime() + tokenExpNumber);
        const userEmail = resData.headers.get('USER_EMAIL');
        const userName = resData.headers.get('USER_NAME');
        const user1 = new User(
          userId,
          userEmail,
          userName,
          authorization,
          tokenExpirationDate);
        this.user.next(user1);
        this.autoLogout(tokenExpNumber);
        localStorage.setItem('loggedInUserData', JSON.stringify(user1));
      })
    );
  }// end of login

  // Auto login, that is after server refersh or crash
  // idea here is to check if there is data is local storage and get the token.
  // if token is not expired, emit user data.

  autoLogin() {
    const userData: {
      userId: string,
      userEmail: string,
      userName: string,
      _authorizationToken: string,
      tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('loggedInUserData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.userId,
      userData.userEmail,
      userData.userName,
      userData._authorizationToken,
      new Date(userData.tokenExpirationDate));

    if (loadedUser.authorizationToken) {
      console.log('Logging the user from local storage');

      this.user.next(loadedUser);
      const expirationDuration = new Date(userData.tokenExpirationDate).getTime()
        - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  // logout
  logOut() {
    this.user.next(null);
    this.route.navigate(['/blogs/users/login']);
    localStorage.removeItem('loggedInUserData');
    // clears the timer

    if (this.tokenExpirationTimer) {
      clearTimeout();
    }
    this.tokenExpirationTimer = null;
  }

  // Auto logout on token expiration
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    },
      expirationDuration);

  }
  public getUser(userEmail: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/blogs/users/${userEmail}`).pipe(
      map(userData => {
        if (userData) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
// check if user exists
