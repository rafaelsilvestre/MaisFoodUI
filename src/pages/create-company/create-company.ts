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
    filterPrimaryColumn: Array<Filter> = [];
    filterSecondColumn: Array<Filter> = [];

    constructor(private formBuilder: FormBuilder, private companyService: CompanyServiceProvider,
                private router: Router, private filterService: FilterServiceProvider) {

        this.formGroup = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', Validators.required],
            minimum_value: ['', [Validators.required]],
            filters: [],
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

            const controls = filters.map(c => {
                let field = new FormControl(false);
                field.setValue(c.id);
                return field;
            });
            this.formGroup.controls['filters'] = new FormArray(controls);
        }).catch((error) => {
            if(error && error.error && error.error.message){
                console.info("Error", error.error.message);
            }
        });
        console.log(this.formGroup);
    }

    ngAfterViewInit(): void {
        setTimeout(_ => this.inflateViewInit());
    }

    inflateViewInit() {}

    buildFilters() {
        const arr = this.filters.map(skill => {
            return this.formBuilder.control(true, [Validators.required]);
        });
        console.log("arr", arr);
        return this.formBuilder.array(arr);
    }

    saveCompany(formData: any): void {
        console.log("Filters", this.filters);
        const selectedFiltersIds = formData.filters.map((v, i) => {
            console.log("v", v);
            return v ? this.filters[i].id : null;
        });
        console.log("FormData", selectedFiltersIds);return;
        // formData.minimum_value = formData.minimum_value.replace('R$ ', '').replace(',', '.');
        //
        // this.companyService.saveCompany(formData).then((result) => {
        //     this.router.navigate(['/companies']);
        // }).catch((error) => console.log("Error", error));
    }

    checkedFilter(filter: Filter, e): void {
        console.log(e.target.checked);
        console.log(filter);
    }
}
