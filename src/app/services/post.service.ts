import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PostRequest } from '../model/request/post-request';
import { PostDetailResponse } from '../model/response/post-detail-response';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = 'http://ec2-13-232-6-4.ap-south-1.compute.amazonaws.com:8080/blogs/posts';

  uiPosts: PostDetailResponse[] = [];

  constructor(private http: HttpClient) { }

  public createPostService(postRequest: PostRequest) {

    return this.http.post(this.url, postRequest);
  }

  // Get posts
  public getPosts(): Observable<PostDetailResponse[]> {
    return this.http.get<PostDetailResponse[]>(this.url);

  }

  // get post by PostId
  public getPostByPostId(postId: string): Observable<PostDetailResponse> {
    return this.http.get<PostDetailResponse>(`http://ec2-13-232-6-4.ap-south-1.compute.amazonaws.com:8080/blogs/posts/${postId}`);
  }
}
