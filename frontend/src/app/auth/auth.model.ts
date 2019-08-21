export class Token {
    constructor(public value: string, public expirationDate: Date) { }
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface SignUpCredentials {
    username: string;
    email: string;
    password: string;
}

export interface AuthUserResponse {
    id: number;
    username: string;
    email: string;
    roles: string[];
    token: {
        value: string;
        duration: number;
    };
}

export interface SignUpUserResponse {
    id: number;
    username: string;
    email: string;
    enabled: boolean;
}
