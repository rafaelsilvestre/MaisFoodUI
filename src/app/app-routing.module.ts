import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { SettingsPage } from '../pages/settings/settings';
import { UsersPage } from '../pages/users/users';
import { CompaniesPage } from '../pages/companies/companies';
import { CreateCompanyPage } from '../pages/create-company/create-company';
import { CompanyPage } from '../pages/company/company';
import { ProductsPage } from '../pages/products/products';

import { AuthGuard } from '../providers/guards/auth-guard';

const appRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginPage },
    { path: 'dashboard', component: DashboardPage, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsPage, canActivate: [AuthGuard] },

    // USERS
    { path: 'users', component: UsersPage, canActivate: [AuthGuard] },

    // COMPANIES
    { path: 'companies', component: CompaniesPage, canActivate: [AuthGuard] },
    { path: 'companies/create', component: CreateCompanyPage, canActivate: [AuthGuard] },
    { path: 'company/:id', component: CompanyPage, canActivate: [AuthGuard] },

    // PRODUCTS
    { path: 'products', component: ProductsPage, canActivate: [AuthGuard] }
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
