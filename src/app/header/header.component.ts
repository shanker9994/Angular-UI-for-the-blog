import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalAppService } from '../utils/global-app.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isNavbarCollapsed = true;
  isUserLoggedIn = false;
  userName: string;
  private authUser = false;

  private userSub: Subscription;

  constructor(
    private globalApp: GlobalAppService,
    private auth: AuthService) { }

  ngOnInit() {
    this.userSub = this.auth.user.subscribe(user => {
      // this.isUserLoggedIn = !user ? false : true;
      if (user) {
        this.isUserLoggedIn = true;
        this.userName = user.userName;
        if (user.userEmail === 'shanker9994@gmail.com') {
          this.authUser = true;
        }
      } else {
        this.isUserLoggedIn = false;
        this.authUser = false;
      }

    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
