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

import { InputMaskDirective } from '../directives/input-mask/input-mask';

import { MoneyPipe } from '../pipes/money-mask/money-mask';

import { UserServiceProvider } from '../providers/services/user-service';
import { AuthServiceProvider } from '../providers/services/auth-service';
import { CompanyServiceProvider } from '../providers/services/company-service';
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
        // Directives
        InputMaskDirective,
        // Pipes
        MoneyPipe
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
        AuthInterceptorProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
