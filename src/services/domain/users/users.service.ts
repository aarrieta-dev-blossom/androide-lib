import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../models/domain/users/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('api/users');
    }

    addUser(user: User): Observable<User> {
        return this.http.post<User>('api/users', user);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>('api/users/' + user.id, user);
    }

    deleteUser(id: number): Observable<User> {
        return this.http.delete<User>('api/users/' + id);
    }
}
