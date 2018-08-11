import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { SettingsPage } from '../pages/settings/settings';
import { UsersPage } from '../pages/users/users';

import { AuthGuard } from '../providers/guards/auth-guard';

const appRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginPage },
    { path: 'dashboard', component: DashboardPage, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsPage, canActivate: [AuthGuard] },
    { path: 'users', component: UsersPage, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
