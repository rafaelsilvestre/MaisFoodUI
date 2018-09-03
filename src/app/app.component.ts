import { Component } from '@angular/core';
import { AuthServiceProvider } from '../providers/services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    logged: boolean = false;

    constructor(private authService: AuthServiceProvider) {
        this.authService.watchLoggedUser().subscribe(isLogged => {
            this.logged = isLogged;
        });
    }
}
