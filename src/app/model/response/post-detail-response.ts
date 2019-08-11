import { UserDetailResponse } from './user-detail-response';

export class PostDetailResponse {

    constructor(
        public postId: string,
        public title: string,
        public content: string,
        public creationDate: Date,
        public lastupdatedDate: Date,
        public tag: string,
        public description: string,
        public user: UserDetailResponse
    ) { }
}
