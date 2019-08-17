import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentRequest } from '../model/request/comment-request';
import { Observable } from 'rxjs';
import { CommentResponse } from '../model/response/comment-response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  public postComment(comment: CommentRequest, postId: string): Observable<CommentResponse> {
    return this.http.post<CommentResponse>
      (`https://springbootjavaapi.ml/blogs/posts/${postId}/comments`,
        comment);
  }

  // get all comments for a post.

  public getAllCommentsByPostId(postId: string): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>
      (`https://springbootjavaapi.ml/blogs/posts/${postId}/comments`);
  }
}
