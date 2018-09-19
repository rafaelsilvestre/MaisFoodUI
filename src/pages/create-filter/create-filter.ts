import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyServiceProvider } from '../../providers/services/company-service';
import Utils from '../../utils/utils';
import {Router} from '@angular/router';
import {FilterServiceProvider} from '../../providers/services/filter-service';

@Component({
    selector: 'create-filter-page',
    templateUrl: './create-filter.html',
    styleUrls: ['./create-filter.css']
})
export class CreateFilterPage {
    formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private filterService: FilterServiceProvider,
                private router: Router) {
        this.formGroup = this.formBuilder.group({
           name: ['', [Validators.required]]
        });
    }

    saveFilter(data): void{
        this.filterService.saveFilter(data).then(() => {
            this.router.navigate(['/filters']);
        }).catch((error) => console.log("Error", error));
    }
}
