import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let isLogged: boolean = true;
            resolve(isLogged);
            if(!isLogged) this.router.navigate(["/login"]);
        });
    }
}
