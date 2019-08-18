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
      (`http://localhost:8080/blogs/posts/tags/${tagName}`);

  }
}
