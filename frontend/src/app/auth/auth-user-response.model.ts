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
