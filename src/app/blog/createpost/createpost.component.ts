import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostRequest } from 'src/app/model/request/post-request';
import { UserRequest } from 'src/app/model/request/user-request';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  tags = ['Java', 'Spring Boot',
    'Database', 'Linux', 'Misc'];

  postCreationError;

  // create object of Post clss to hold the data.
  user: UserRequest = new UserRequest('Shankar', 'shankar@gmail.com');
  postRequest: PostRequest = new PostRequest('1', '', '', '', '', this.user);

  constructor(private postService: PostService) {

  }

  ngOnInit() {
    this.user = new UserRequest('Shankar', 'shanker9994@gmail.com');
    this.postRequest = new PostRequest('', '', '', '', '', this.user);
  }

  onSubmit(formData: NgForm) {
    console.log(this.postRequest);
    this.postService.createPostService(this.postRequest).subscribe(
      createdPostData => {
        console.log(createdPostData);
      },
      error => {

        this.postCreationError = error.error.message;

      });
    formData.reset();
  }

}
