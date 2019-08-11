import { Component, OnInit } from '@angular/core';
import { GlobalAppService } from 'src/app/utils/global-app.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  logOutMessage = 'You have logged out successfully';

  constructor(
    private globalApp: GlobalAppService,
    private route: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.logOut();

  }

}
