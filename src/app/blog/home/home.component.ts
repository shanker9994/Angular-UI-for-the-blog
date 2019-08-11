import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostDetailResponse } from 'src/app/model/response/post-detail-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  uiPosts: PostDetailResponse[] = [];
  p: number = 1;
  filter: string;


  constructor(private postService: PostService) { }

  ngOnInit() {

    this.postService.getPosts().subscribe(
      returnedPosts => {
        this.uiPosts = returnedPosts;
        console.log(this.uiPosts);
      },
      error => {
        console.log(error);
      });
  }

}
