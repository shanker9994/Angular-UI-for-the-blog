import { Component, OnInit, OnDestroy, AfterViewChecked, ɵConsole } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { PostDetailResponse } from 'src/app/model/response/post-detail-response';
import { UserRequest } from 'src/app/model/request/user-request';
import { NgForm } from '@angular/forms';
import { CommentRequest } from 'src/app/model/request/comment-request';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserDetailResponse } from 'src/app/model/response/user-detail-response';
import { CommentResponse } from 'src/app/model/response/comment-response';
import { GlobalAppService } from 'src/app/utils/global-app.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserLoginRequestModel } from 'src/app/user/user-login-request-model';
import { Observable, Subscription } from 'rxjs';
import { map, take, delay } from 'rxjs/operators';
import { HighlightService } from 'src/app/services/highlight.service';


@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit, OnDestroy, AfterViewChecked {


  postDetails: PostDetailResponse;
  highlighted: boolean = false;
  uiComments: CommentResponse[] = [];

  postLoading = false;
  postLoadingError = null;
  signUpError = null;
  commentPostError = null;
  userLogInFlag = null;


  /*For comment :start*/
  user: UserRequest = new UserRequest('', '', '');
  comment: CommentRequest = new CommentRequest('', '', true, new Date(), null, null);
  userResponse: UserDetailResponse;
  inValidEmail: string = null;
  userFlag: boolean = false;

  SignedUserObserable = new Observable();
  userSubscription: Subscription;
  /*for comment :end*/

  constructor(
    private postService: PostService,
    private activatedroute: ActivatedRoute,
    private userService: UserService,
    private commentservice: CommentService,
    private globalApp: GlobalAppService,
    private authService: AuthService,
    private highlightService: HighlightService) { }

  ngAfterViewChecked() {
    if (this.postDetails && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

  ngOnInit() {
    // Get post details

    this.postLoading = true;
    const postId: string = this.activatedroute.snapshot.params['postId'];
    this.postService.getPostByPostId(postId)
      .subscribe(
        postdata => {
          this.postDetails = postdata;
          this.postLoading = false;
          this.commentservice.getAllCommentsByPostId(this.postDetails.postId)
            .subscribe(
              commentData => {
                this.uiComments = commentData;
                console.log('Comments are retrived');
              },
              error => {

                console.log('Error retriving comments' + error.error.message);
                console.log(error.error.creationDate);
              }
            );
        },
        error => {
          console.log('Errors retriving post details');
          this.postLoadingError = error.error.message;
          this.postLoading = false;

        }
      );

    // this.authService.user.pipe(
    //   take(2), map(
    //     userLogIn => {
    //       this.userLogInFlag = userLogIn ? true : false;
    //       console.log('--------------------' + this.userLogInFlag);
    //     }
    //   )
    // );
    this.userSubscription = this.authService.user.subscribe(
      userLogIn => {
        this.userLogInFlag = userLogIn ? true : false;
        // console.log('--------------------' + this.userLogInFlag);
      }
    );


  }

  // On comment Submit

  public onCommentSubmit(formData: NgForm) {
    this.inValidEmail = null;
    this.userResponse = null;
    this.userFlag = false;



    this.comment.postId = this.postDetails.postId;
    // this.comment.userEmail = formData.value.userEmail;

    // for login
    const userLoginRequestModel: UserLoginRequestModel = {
      email: formData.value.email,
      password: formData.value.password
    };

    // for signup
    const userSignUp = new UserRequest('', '', '');
    userSignUp.userEmail = formData.value.email;
    userSignUp.password = formData.value.password;
    console.log(userSignUp);

    // check if user email exists
    if (!localStorage.getItem('loggedInUserData')) {
      // check if user exists.
      // user exists, login user.
      // user does not exists, create user and login.
      // post comment
      // retrive comment again
      console.log('No user data in cache');
      const userEmail = formData.value.email;
      let userExistsFlag = false;
      this.authService.getUser(userEmail).subscribe(flag => {
        userExistsFlag = flag;
        console.log('user exists flag is -' + flag);
        if (!userExistsFlag) {
          console.log('User does not exists = ' + userEmail + ' Signing up user');
          console.log('[postDetail] User Signup process');
          this.authService.signUp(userSignUp).subscribe(
            userSignUpData => {
              this.authService.signIn(userLoginRequestModel).subscribe(
                signedInData => {
                  // create comment.
                  console.log('Signed User Data' + JSON.stringify(signedInData));
                  this.comment.userEmail = userLoginRequestModel.email;
                  this.commentservice.postComment(this.comment, this.comment.postId).subscribe(
                    commentDataReturned => {
                      commentDataReturned = commentDataReturned;
                      /* get all comment*/
                      this.commentservice.getAllCommentsByPostId(this.postDetails.postId)
                        .subscribe(
                          commentRetrivedData => {
                            this.uiComments = commentRetrivedData;
                            console.log(this.uiComments);
                          },
                          commentRetrivedError => {
                            console.log(commentRetrivedError.error.message);
                            console.log(commentRetrivedError.error.creationDate);
                          });
                      // end of get comment */
                      formData.reset();
                    },
                    commentUiError => {
                      commentUiError = commentUiError;
                    });
                  // end of post comment */
                },
                signingError => {
                  this.inValidEmail = signingError;
                });


            },
            signUpError => {
              this.signUpError = signUpError;
              console.log('SignUp error');
            }
          );
        } else {
          this.authService.signIn(userLoginRequestModel).subscribe(
            signedInData => {
              // create comment.
              console.log('Signed User Data' + JSON.stringify(signedInData));
              this.comment.userEmail = userLoginRequestModel.email;
              this.commentservice.postComment(this.comment, this.comment.postId).subscribe(
                commentDataReturned => {
                  commentDataReturned = commentDataReturned;
                  /* get all comment*/
                  this.commentservice.getAllCommentsByPostId(this.postDetails.postId)
                    .subscribe(
                      commentRetrivedData => {
                        this.uiComments = commentRetrivedData;
                        console.log(this.uiComments);
                      },
                      commentRetrivedError => {
                        console.log(commentRetrivedError.error.message);
                        console.log(commentRetrivedError.error.creationDate);
                      });
                  // end of get comment */
                  formData.reset();
                },
                commentUiError => {
                  commentUiError = commentUiError;
                });
              // end of post comment */
            },
            signingError => {
              this.inValidEmail = signingError;
            });
        }
      });

    }
    // tslint:disable-next-line: one-line
    else {
      console.log('User alreday signed in');
      // console.log(JSON.parse(localStorage.getItem('loggedInUserData')));
      this.comment.userEmail = JSON.parse(localStorage.getItem('loggedInUserData')).userEmail;
      // console.log(this.comment.userEmail);
      this.commentservice.postComment(this.comment, this.comment.postId).subscribe(
        commentDataReturned => {
          commentDataReturned = commentDataReturned;
          /* get all comment*/
          this.commentservice.getAllCommentsByPostId(this.postDetails.postId)
            .subscribe(
              commentRetrivedData => {
                this.uiComments = commentRetrivedData;
                console.log(this.uiComments);
              },
              commentRetrivedError => {
                console.log(commentRetrivedError.error.message);
                console.log(commentRetrivedError.error.creationDate);
              });
          // end of get comment */
          formData.reset();
        },
        commentUiError => {
          commentUiError = commentUiError;
        });
    }

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }


}
