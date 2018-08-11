import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthServiceProvider } from '../../providers/services/auth-service';
import { emailValidator } from '../../validators/validators';
import * as md5 from 'md5';

interface UserProfile{
    name: string;
    gravatar: string;
}

@Component({
    selector: 'logged-out-template',
    templateUrl: './logged-out-template.html',
    styleUrls: ['./logged-out-template.css']
})
export class LoggedOutTemplateComponent {
    formGroup: FormGroup;
    userProfile: UserProfile = {name: null, gravatar: "https://ssl.gstatic.com/accounts/ui/avatar_2x.png"};

    constructor(private formBuilder: FormBuilder, private authService: AuthServiceProvider){
        this.formGroup = this.formBuilder.group({
            email: ["", [Validators.required, emailValidator()]],
            password: ["", [Validators.required]],
            remember: [false, [Validators.required]]
        });
    }

    private getUserGravatar(email, size: number = 150): string{
        return 'http://www.gravatar.com/avatar/' + md5(email) + '.jpg?s=' + size;
    }

    private doLogin(data): void{
        this.authService.authUser(data).then((results) => {
            this.userProfile.name = "Rafael Silvestre";
            this.userProfile.gravatar = this.getUserGravatar(data.email);
            console.log(results);
        }).catch((error) => {
            console.log(error);
        });
    }
}
