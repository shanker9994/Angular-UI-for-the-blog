export class User {
    // class to hold loggedIn user
    constructor(
        public userId: string,
        public userEmail: string,
        public userName: string,
        // tslint:disable-next-line: variable-name
        private _authorizationToken: string,
        public tokenExpirationDate?: Date

    ) { }

    get authorizationToken() {
        /* Implement  */
        if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
            return null;
        }

        return this._authorizationToken;
    }
}
