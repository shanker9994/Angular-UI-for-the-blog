export class UserRequest {
    public userName: string;
    public userEmail: string;
    public password: string;

    public constructor(userName: string, userEmail: string, userPassword: string = '1') {
        this.userName = userName;
        this.userEmail = userEmail;
        this.password = userPassword;
    }


}
