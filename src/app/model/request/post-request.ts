import { UserRequest } from './user-request';

export class PostRequest {

    public postId: string;
    public title: string;
    public content: string;
    public tag: string;
    public description: string;
    public user?: UserRequest;

    public constructor(
        postId: string,
        title: string,
        content: string,
        tag: string,
        description: string,
        user: UserRequest
    ) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.tag = tag;
        this.user = user;
        this.description = description;
    }


}
