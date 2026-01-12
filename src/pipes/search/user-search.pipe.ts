import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../models/domain/users/user.model';

@Pipe({
    name: 'UserSearchPipe',
    pure: false,
    standalone: true
})
export class UserSearchPipe implements PipeTransform {
    transform(value: User[] | null, args?: string): User[] {
        if (!value || !args) return value || [];
        const searchText = new RegExp(args, 'ig');
        return value.filter(user => {
            if (user.profile?.name) {
                return user.profile.name.search(searchText) !== -1;
            }
            return user.username.search(searchText) !== -1;
        });
    }
}
