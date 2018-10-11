import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {CategoryServiceProvider} from '../../providers/services/category-service';

@Component({
    selector: 'create-category-page',
    templateUrl: './create-category.html',
    styleUrls: ['./create-category.css']
})
export class CreateCategoryPage {
    formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private categoryService: CategoryServiceProvider,
                private router: Router) {
        this.formGroup = this.formBuilder.group({
            name: ['', [Validators.required]]
        });
    }

    saveCategory(data): void{
        this.categoryService.saveCategory(data).then(() => {
            this.router.navigate(['/categories']);
        }).catch((error) => console.log("Error", error));
    }
}
