import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'shorten' })
export class Shorten implements PipeTransform {
    transform(value: string, length: number = 10) {
        if (value.length > length) {
            return value.substr(0, length) + ' [...]';
        } else {
            return value;
        }
    }
}
