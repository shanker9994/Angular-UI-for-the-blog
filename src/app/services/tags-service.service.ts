import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostDetailResponse } from '../model/response/post-detail-response';

@Injectable({
  providedIn: 'root'
})
export class TagsServiceService {



  constructor(private http: HttpClient) { }

  getAllPostByTagName(tagName: string): Observable<PostDetailResponse[]> {
    return this.http.get<PostDetailResponse[]>
      (`https://springbootjavaapi.ml/blogs/posts/tags/${tagName}`);

  }
}
