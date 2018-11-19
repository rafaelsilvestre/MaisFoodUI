import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoggedInTemplateComponent } from '../components/logged-in-template/logged-in-template';
import { LoggedOutTemplateComponent } from '../components/logged-out-template/logged-out-template';
import { NavBarComponent } from '../components/nav-bar/nav-bar';

import { DashboardPage } from '../pages/dashboard/dashboard';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
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
import { EditCompanyPage } from '../pages/edit-company/edit-company';

import { InputMaskDirective } from '../directives/input-mask/input-mask';

import { MoneyPipe } from '../pipes/money-mask/money-mask';
import { PermissionConverterPipe } from '../pipes/permission-converter/permission-converter';

import { UserServiceProvider } from '../providers/services/user-service';
import { AuthServiceProvider } from '../providers/services/auth-service';
import { CompanyServiceProvider } from '../providers/services/company-service';
import { FilterServiceProvider } from '../providers/services/filter-service';
import { ProductServiceProvider } from '../providers/services/product-service';
import { CategoryServiceProvider } from '../providers/services/category-service';

import { AuthInterceptorProvider } from '../providers/interceptors/auth-interceptor';

import { AuthGuard } from '../providers/guards/auth-guard';

@NgModule({
    declarations: [
        // Components
        AppComponent,
        LoggedInTemplateComponent,
        LoggedOutTemplateComponent,
        NavBarComponent,
        // Pages
        LoginPage,
        DashboardPage,
        SettingsPage,
        UsersPage,
        CompaniesPage,
        CreateCompanyPage,
        CompanyPage,
        ProductsPage,
        FiltersPage,
        CreateFilterPage,
        EditProfilePage,
        CreateProductPage,
        CategoriesPage,
        MyOrdersPage,
        CreateCategoryPage,
        EditProductPage,
        EditCompanyPage,
        // Directives
        InputMaskDirective,
        // Pipes
        MoneyPipe,
        PermissionConverterPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        // Guards
        AuthGuard,
        // Services Providers
        UserServiceProvider,
        AuthServiceProvider,
        CompanyServiceProvider,
        ProductServiceProvider,
        CategoryServiceProvider,
        AuthInterceptorProvider,
        FilterServiceProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
