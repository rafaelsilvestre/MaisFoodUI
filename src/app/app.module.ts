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

import { InputMaskDirective } from '../directives/input-mask/input-mask';

import { UserServiceProvider } from '../providers/services/user-service';

@NgModule({
    declarations: [
        // components
        AppComponent,
        LoggedInTemplateComponent,
        LoggedOutTemplateComponent,
        NavBarComponent,
        // pages
        LoginPage,
        DashboardPage,
        SettingsPage,
        UsersPage,
        // directives
        InputMaskDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        UserServiceProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
