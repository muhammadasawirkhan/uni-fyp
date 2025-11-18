import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // In real app, replace with HttpClient calls to your backend
  private readonly User = { email: 'asawir@gmail.com', password: 'password123', token: 'FAKE-JWT-TOKEN' };

  constructor(private router: Router) {}

  signup(email: string, password: string): Observable<{ success: boolean }> {
    // mock delay
    return of({ success: true }).pipe(delay(800));
    // For real: return this.http.post('/api/signup', {email, password})
  }

  login(email: string, password: string): Observable<boolean> {
    // fake check
    return of(this.User).pipe(
      delay(800),
      map(user => {
        if (email === user.email && password === user.password) {
          localStorage.setItem('auth_token', user.token);
          return true;
        }
        throw new Error('Invalid credentials');
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
