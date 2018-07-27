import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { SettingsPage } from '../pages/settings/settings';
import { UsersPage } from '../pages/users/users';

const appRoutes: Routes = [
    // admin pages
    { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
    { path: 'admin/login', component: DashboardPage },
    { path: 'admin/dashboard', component: DashboardPage },
    { path: 'admin/login', component: LoginPage },
    { path: 'admin/settings', component: SettingsPage },
    { path: 'admin/users', component: UsersPage}

    // client pages
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
