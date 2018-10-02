import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthServiceProvider} from '../../providers/services/auth-service';

@Component({
    selector: 'edit-profile-page',
    templateUrl: './edit-profile.html',
    styleUrls: ['./edit-profile.css']
})
export class EditProfilePage {
    formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthServiceProvider){
        this.formGroup = this.formBuilder.group({
            name: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required]
        });

        let user = this.authService.getUserLogged().then((user) => {
            this.formGroup.controls['name'].setValue(user.name);
            this.formGroup.controls['lastname'].setValue(user.lastName);
            this.formGroup.controls['email'].setValue(user.email);
        });
    }

    updateUser(formData: any): void{
        console.log("FormData", formData);
    }
}
