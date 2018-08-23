import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyServiceProvider } from '../../providers/services/company-service';
import Utils from '../../utils/utils';
import {Router} from '@angular/router';

@Component({
    selector: 'create-company-page',
    templateUrl: './create-company.html',
    styleUrls: ['./create-company.css']
})
export class CreateCompanyPage {
    formGroup: FormGroup;
    moneyMask: any = Utils.getMoneyMask();

    constructor(private formBuilder: FormBuilder, private companyService: CompanyServiceProvider, private router: Router) {
        this.formGroup = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', Validators.required],
            minimum_value: ['', [Validators.required]]
        });
    }

    saveCompany(formData: any): void {
        formData.minimum_value = formData.minimum_value.replace('R$ ', '').replace(',', '.');
        this.companyService.saveCompany(formData).then((result) => {
            this.router.navigate(['/companies']);
        }).catch((error) => console.log("Error", error));
    }
}
