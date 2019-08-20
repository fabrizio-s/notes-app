import { User } from '../../shared/model/user.model';

export interface Note {
    id?: number;
    title: string;
    user: User;
    body: string;
}
