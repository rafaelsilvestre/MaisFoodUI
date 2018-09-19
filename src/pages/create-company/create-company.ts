import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyServiceProvider } from '../../providers/services/company-service';
import { FilterServiceProvider } from '../../providers/services/filter-service';
import { Filter } from '../../entities/filter';
import Utils from '../../utils/utils';

@Component({
    selector: 'create-company-page',
    templateUrl: './create-company.html',
    styleUrls: ['./create-company.css']
})
export class CreateCompanyPage {
    formGroup: FormGroup;
    moneyMask: any = Utils.getMoneyMask();
    filters: Array<Filter> = [];

    constructor(private formBuilder: FormBuilder, private companyService: CompanyServiceProvider,
                private router: Router, private filterService: FilterServiceProvider) {
        this.formGroup = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', Validators.required],
            minimum_value: ['', [Validators.required]],
            filter: ['', [Validators.required]],
            // owner
            name_owner: ['', [Validators.required]],
            lastname_owner: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });

        this.filterService.getAllFilters().then((filters) => {
            this.filters = filters;
        }).catch((error) => console.log("Error", error));
    }

    saveCompany(formData: any): void {
        formData.minimum_value = formData.minimum_value.replace('R$ ', '').replace(',', '.');
        this.companyService.saveCompany(formData).then((result) => {
            this.router.navigate(['/companies']);
        }).catch((error) => console.log("Error", error));
    }
}
