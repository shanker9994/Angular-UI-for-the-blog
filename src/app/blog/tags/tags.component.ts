import { Component, OnInit } from '@angular/core';
import { TagsServiceService } from 'src/app/services/tags-service.service';
import { ActivatedRoute, Params } from '@angular/router';
import { PostDetailResponse } from 'src/app/model/response/post-detail-response';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  uiPostsBytags: PostDetailResponse[] = [];
  errorMessage: any = '';
  tagname: string;

  constructor(
    private tagsService: TagsServiceService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //let tagName = this.activatedRoute.snapshot.params['tagName'];
    // console.log(tagName);

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.tagname = params['tagName'];
        console.log(this.tagname);
        this.tagsService.getAllPostByTagName(params['tagName'])
          .subscribe(
            responseData => {
              this.uiPostsBytags = responseData;
            },
            error => {
              this.errorMessage = error;
            }
          );
      }
    );
    // this.tagsService.getAllPostByTagName(this.tagname)
    //   .subscribe(
    //     responseData => {
    //       this.uiPostsBytags = responseData;
    //     },
    //     error => {
    //       this.errorMessage = error;
    //     }
    //   );

  }

}
