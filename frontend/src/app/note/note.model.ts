import { User } from '../user/user.model';

export interface Note {
    id: number;
    title: string;
    user: User;
    body: string;
}
