import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Utils from '../../utils/utils';
import { CompanyServiceProvider } from '../../providers/services/company-service';
import {MoneyPipe} from '../../pipes/money-mask/money-mask';
import swal from "sweetalert2";

@Component({
    selector: 'settings-page',
    templateUrl: './settings.html',
    styleUrls: ['./settings.css']
})
export class SettingsPage {
    settingsFormGroup: FormGroup;
    workedDaysFormGroup: FormGroup;
    moneyMask: any = Utils.getMoneyMask();
    hourMask = Utils.getHourMask();
    intervalOnTheDay: boolean = false;
    company: any;

    constructor(private formBuilder: FormBuilder, private companyService: CompanyServiceProvider){
        this.settingsFormGroup = this.formBuilder.group({
            name: ["", [Validators.required]],
            description: ["", [Validators.required]],
            minimumValue: ["", Validators.required]
        });

        this.companyService.getCompanyByUserLogged().then((company) => {
            this.company = company;
            this.resolveCompanyData();
        }).catch((error) => console.log("Error", error));

        this.workedDaysFormGroup = this.formBuilder.group({
            monday: this.formBuilder.group({
                start: ["", [Validators.required, Validators.minLength(5)]],
                end: ["", [Validators.required, Validators.minLength(5)]]
            }),
            tuesday: this.formBuilder.group({
                start: ["", [Validators.required, Validators.minLength(5)]],
                end: ["", [Validators.required, Validators.minLength(5)]]
            }),
            wednesday: this.formBuilder.group({
                start: ["", [Validators.required, Validators.minLength(5)]],
                end: ["", [Validators.required, Validators.minLength(5)]]
            }),
            thursday: this.formBuilder.group({
                start: ["", [Validators.required, Validators.minLength(5)]],
                end: ["", [Validators.required, Validators.minLength(5)]]
            }),
            friday: this.formBuilder.group({
                start: ["", [Validators.required, Validators.minLength(5)]],
                end: ["", [Validators.required, Validators.minLength(5)]]
            }),
            saturday: this.formBuilder.group({
                start: ["", [Validators.required, Validators.minLength(5)]],
                end: ["", [Validators.required, Validators.minLength(5)]]
            }),
            sunday: this.formBuilder.group({
                start: ["", [Validators.required, Validators.minLength(5)]],
                end: ["", [Validators.required, Validators.minLength(5)]]
            })
        });
    }

    resolveCompanyData(): void {
        if(this.company == null) return;

        this.settingsFormGroup.controls['name'].setValue(this.company.name);
        this.settingsFormGroup.controls['description'].setValue(this.company.description);
        this.settingsFormGroup.controls['minimumValue'].setValue(new MoneyPipe().transform(this.company.minimumValue));
    }

    verifyField(e: any): void {
        if(e.target.value.toString().length != 5){
            e.target.value = "";
        }
    }

    saveWorkedDays(days: any): void {
        console.log("Days", days);
    }

    saveSettings(data): void {
        if(isNaN(data.minimumValue))
            data.minimumValue = data.minimumValue.toString().replace('R$ ', '').replace(',', '.');
        data.companyName = data.name;
        this.companyService.getCompanyByUserLogged().then((company) => {
            this.companyService.updateCompany(company.id, data).then(() => {
                swal({
                    title: 'Dados salvos com sucesso!',
                    confirmButtonText:  'Ok',
                    showCancelButton: false,
                    showCloseButton: false
                });
            }).catch((error) => console.log("Error", error));
        }).catch((error) => console.log("Error", error));
        console.log(data);
    }
}
