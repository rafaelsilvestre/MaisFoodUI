import { Component } from '@angular/core';
import { AuthServiceProvider } from '../../providers/services/auth-service';
import { Router } from '@angular/router';
import * as md5 from 'md5';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.html',
    styleUrls: ['./nav-bar.css']
})
export class NavBarComponent {
    userLogged: any;

    constructor(private authService: AuthServiceProvider, private router: Router){
        this.userLogged = this.authService.getUserLogged().then((user) => {
            this.userLogged = user;

            if(user.email != null ){
                this.userLogged.gravatar = 'http://www.gravatar.com/avatar/' + md5(user.email) + '.jpg?s=' + 150;
            }
        }).catch((error) => console.log("Error", error));
    }

    private getUserGravatar(email, size: number = 150): void{

    }

    logout(): void{
        this.router.navigate(['/login']);
        this.authService.logOut();
    }
}
