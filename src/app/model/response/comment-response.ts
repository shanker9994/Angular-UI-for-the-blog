import { UserDetailResponse } from './user-detail-response';

export class CommentResponse {

    constructor(
        commentId: string,
        commentText: string,
        display: boolean,
        creationDate: Date,
        user: UserDetailResponse
    ) { }
}
