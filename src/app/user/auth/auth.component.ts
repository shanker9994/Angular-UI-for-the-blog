import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRequest } from 'src/app/model/request/user-request';
import { AuthService } from 'src/app/services/auth.service';
import { UserLoginRequestModel } from '../user-login-request-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  uiError: string = null;
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    public router: Router) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }


  onAuthSubmit(authData: NgForm) {
    this.uiError = null;
    console.log(authData.value);
    const user = new UserRequest('', '', '');
    user.userEmail = authData.value.email;
    user.password = authData.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      // call the signIn service
      const userLoginRequestModel: UserLoginRequestModel = {
        email: authData.value.email,
        password: authData.value.password
      };

      console.log('calling signIn service');
      this.authService.signIn(userLoginRequestModel).subscribe(
        userBackendData => {
          console.log('Successfully Authenticated');
          this.isLoading = false;
          this.router.navigate(['/']); // this "/ " is the home page
        },
        uiLoginError => {
          console.log('erros happened');
          console.log(uiLoginError);
          this.uiError = uiLoginError;
          this.isLoading = false;
        }
      );

    } else {
      // call the signup service
      console.log('calling signup service');
      this.authService.signUp(user).subscribe(
        userBackendData => {
          console.log(userBackendData);
          this.isLoading = false;
        },
        uibackedErrorError => {
          console.log(uibackedErrorError);
          this.uiError = uibackedErrorError;
          this.isLoading = false;
        }
      );
    }
    authData.reset();
  }
}
