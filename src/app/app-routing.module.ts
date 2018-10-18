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
import { FiltersPage } from '../pages/filters/filters';
import { CreateFilterPage } from '../pages/create-filter/create-filter';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { CreateProductPage } from '../pages/create-product/create-product';
import { CategoriesPage } from '../pages/categories/categories';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { CreateCategoryPage } from '../pages/create-category/create-category';
import { EditProductPage } from '../pages/edit-product/edit-product';

import { AuthGuard } from '../providers/guards/auth-guard';

const appRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginPage },

    // Main
    { path: 'dashboard', component: DashboardPage, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsPage, canActivate: [AuthGuard] },

    // USERS
    { path: 'users', component: UsersPage, canActivate: [AuthGuard] },
    { path: 'edit-profile', component: EditProfilePage, canActivate: [AuthGuard] },

    // COMPANIES
    { path: 'companies', component: CompaniesPage, canActivate: [AuthGuard] },
    { path: 'companies/create', component: CreateCompanyPage, canActivate: [AuthGuard] },
    { path: 'company/:id', component: CompanyPage, canActivate: [AuthGuard] },

    // PRODUCTS
    { path: 'products', component: ProductsPage, canActivate: [AuthGuard] },
    { path: 'products/create', component: CreateProductPage, canActivate: [AuthGuard] },
    { path: 'products/edit/:id', component: EditProductPage, canActivate: [AuthGuard] },

    // CATEGORIES
    { path: 'categories', component: CategoriesPage, canActivate: [AuthGuard] },
    { path: 'categories/create', component: CreateCategoryPage, canActivate: [AuthGuard] },

    // MY ORDERS
    { path: 'my-orders', component: MyOrdersPage, canActivate: [AuthGuard] },

    // FILTERS
    { path: 'filters', component: FiltersPage, canActivate: [AuthGuard] },
    { path: 'filters/create', component: CreateFilterPage, canActivate: [AuthGuard] }
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
