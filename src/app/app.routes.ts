import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login';
import { Signup } from './pages/auth/signup/signup';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout';
import { UsersComponent } from './pages/dashboard/users/users';
import { AuthGuard } from './services/auth-guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: Signup },

  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        loadComponent: () =>
          import('./pages/dashboard/overview/overview').then(m => m.Overview)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/dashboard/settings/settings').then(m => m.Settings)
      },
      
      {
  path: 'users',
  loadComponent: () =>
    import('./pages/dashboard/users/users').then(m => m.UsersComponent)
}
    ]
  },

  { path: '**', redirectTo: 'auth/login' }
];
