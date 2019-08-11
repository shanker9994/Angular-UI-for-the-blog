import { PostRequest } from './post-request';
import { UserRequest } from './user-request';

export class CommentRequest {

    constructor(
        public commentId: string,
        public commentText: string,
        public display: boolean,
        public creationDate: Date,
        public userEmail: string,
        public postId: string
    ) { }
}
