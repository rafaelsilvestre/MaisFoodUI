import { Component } from '@angular/core';
import { AuthServiceProvider } from '../../providers/services/auth-service';
import {Router} from '@angular/router';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.html',
    styleUrls: ['./nav-bar.css']
})
export class NavBarComponent {
    constructor(private authService: AuthServiceProvider, private router: Router){

    }

    logout(): void{
        this.router.navigate(['/login']);
        this.authService.logOut();
    }
}
