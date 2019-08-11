import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { SignupComponent } from './user/signup/signup.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './blog/home/home.component';
import { PostdetailComponent } from './blog/postdetail/postdetail.component';
import { CreatepostComponent } from './blog/createpost/createpost.component';
import { UpdatepostComponent } from './blog/updatepost/updatepost.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error/error.component';
import { SearchComponent } from './blog/search/search.component';
import { TagsComponent } from './blog/tags/tags.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { FooterComponent } from './footer/footer.component';
import { AuthComponent } from './user/auth/auth.component';
import { LoadingSpinnerComponent } from './utils/loading-spinner/loading-spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
    HomeComponent,
    PostdetailComponent,
    CreatepostComponent,
    UpdatepostComponent,
    ErrorComponent,
    SearchComponent,
    TagsComponent,
    FooterComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EditorModule,
    HttpClientModule,
    NgxPaginationModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true

    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
