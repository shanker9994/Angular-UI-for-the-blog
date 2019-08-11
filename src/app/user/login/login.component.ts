import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRequest } from 'src/app/model/request/user-request';
import { Router } from '@angular/router';
import { GlobalAppService } from 'src/app/utils/global-app.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userRequest: UserRequest = new UserRequest('', '', '');
  userEmail: string = localStorage.getItem('userEmail');


  constructor(
    private route: Router,
    private globalApp: GlobalAppService) { }

  ngOnInit() {
  }
  onUserDataSubmit(userData: NgForm) {
    this.userRequest.userEmail = userData.value.userEmail;
    this.userRequest.password = userData.value.userPassword;
    localStorage.setItem('userEmail', this.userRequest.userEmail);
    localStorage.setItem('userName', this.userRequest.userEmail)
    this.globalApp.isUserLoggedIn.next(true);



    this.route.navigate(['/']);




  }

}
