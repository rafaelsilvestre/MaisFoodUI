import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
    filtersChecked: Array<number> = [];
    filterPrimaryColumn: Array<Filter> = [];
    filterSecondColumn: Array<Filter> = [];

    constructor(private formBuilder: FormBuilder, private companyService: CompanyServiceProvider,
                private router: Router, private filterService: FilterServiceProvider) {

        this.formGroup = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', Validators.required],
            minimum_value: ['', [Validators.required]],
            // owner
            name_owner: ['', [Validators.required]],
            lastname_owner: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });

        this.filterService.getAllFilters().then((filters) => {
            this.filters = filters;
            filters.forEach((filter, i) => {
                if(i < Math.round(filters.length / 2)){
                    this.filterPrimaryColumn.push(filters[i]);
                }else{
                    this.filterSecondColumn.push(filters[i]);
                }
            });
        }).catch((error) => {
            if(error && error.error && error.error.message){
                console.info("Error", error.error.message);
            }
        });
    }

    ngAfterViewInit(): void {
        setTimeout(_ => this.inflateViewInit());
    }

    inflateViewInit() {}

    saveCompany(formData: any): void {
        formData.minimum_value = formData.minimum_value.replace('R$ ', '').replace(',', '.');

        formData.categories = [];

        this.filtersChecked.forEach((filterId) => {
            let i = this.filters.map((e) => { return e.id; }).indexOf(filterId);
            formData.categories.push(this.filters[i]);
        });

        this.companyService.saveCompany(formData).then((result) => {
            this.router.navigate(['/companies']);
        }).catch((error) => console.log("Error", error));
    }

    checkedFilter(filter: Filter, isChecked: boolean): void {
        let i = this.filtersChecked.map(function(e) { return e }).indexOf(filter.id);

        if(isChecked)
            this.filtersChecked.push(filter.id);
        else
            this.filtersChecked.splice(i, 1);
    }
}
