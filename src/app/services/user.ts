import { Injectable } from '@angular/core';

export interface User {
  id: number;
  userType:string;
  NPI:number;
  Title:string;
  FirstName:string;
  lastName:string;
  fullName: string;
  email: string;
  username: string;
  role: string;
  status: string;
  phone?: string;
  address?: string;
}

@Injectable({
  providedIn: 'root' // This makes the service available app-wide
})
export class UserService {
  private users: User[] = [];
  private nextId = 1;

  // Add a user
  addUser(user: Omit<User, 'id'>) {
    const newUser: User = { ...user, id: this.nextId++ };
    this.users.push(newUser);
  }

  // Get all users
  getUsers(): User[] {
    return this.users;
  }
}
