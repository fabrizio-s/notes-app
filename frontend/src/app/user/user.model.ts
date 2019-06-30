import { Token } from './token.model';

export class User {

    constructor(public id: number,
                public username: string,
                public email: string,
                public roles: string[],
                // tslint:disable-next-line: variable-name
                private _token: Token) { }

    get token(): Token {
        if (!this._token || !this._token.expirationDate || new Date() > this._token.expirationDate) {
            return null;
        }
        return this._token;
    }

}
