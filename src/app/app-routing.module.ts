import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { SettingsPage } from '../pages/settings/settings';
import { UsersPage } from '../pages/users/users';

const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardPage },
    { path: 'login', component: LoginPage },
    { path: 'settings', component: SettingsPage },
    { path: 'users', component: UsersPage}
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
