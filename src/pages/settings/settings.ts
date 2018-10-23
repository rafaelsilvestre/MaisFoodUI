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
    company: any;
    workedDays: Array<any> = [];

    constructor(private formBuilder: FormBuilder, private companyService: CompanyServiceProvider){
        this.settingsFormGroup = this.formBuilder.group({
            name: ["", [Validators.required]],
            description: ["", [Validators.required]],
            minimumValue: ["", Validators.required]
        });

        this.companyService.getCompanyByUserLogged().then((company) => {
            this.company = company;
            this.resolveCompanyData();

            this.companyService.getWorkedDays(company.id).then((workedDays) => {
                this.workedDays = workedDays;

                if(workedDays.length > 0)
                    this.resolveWorkedDays();
            }).catch((error) => console.log("Error", error));
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

    resolveWorkedDays(): void {
        let sunday: any = this.workedDaysFormGroup.controls['sunday'];
        if(sunday && sunday.controls){
            sunday.controls['start'].setValue(this.workedDays[0].startTime);
            sunday.controls['end'].setValue(this.workedDays[0].endTime);
        }

        let monday: any = this.workedDaysFormGroup.controls['monday'];
        if(monday && monday.controls){
            monday.controls['start'].setValue(this.workedDays[1].startTime);
            monday.controls['end'].setValue(this.workedDays[1].endTime);
        }

        let tuesday: any = this.workedDaysFormGroup.controls['tuesday'];
        if(tuesday && tuesday.controls){
            tuesday.controls['start'].setValue(this.workedDays[2].startTime);
            tuesday.controls['end'].setValue(this.workedDays[2].endTime);
        }

        let wednesday: any = this.workedDaysFormGroup.controls['wednesday'];
        if(wednesday && tuesday.controls){
            wednesday.controls['start'].setValue(this.workedDays[3].startTime);
            wednesday.controls['end'].setValue(this.workedDays[3].endTime);
        }

        let thursday: any = this.workedDaysFormGroup.controls['thursday'];
        if(thursday && thursday.controls){
            thursday.controls['start'].setValue(this.workedDays[4].startTime);
            thursday.controls['end'].setValue(this.workedDays[4].endTime);
        }

        let friday: any = this.workedDaysFormGroup.controls['friday'];
        if(friday && friday.controls){
            friday.controls['start'].setValue(this.workedDays[5].startTime);
            friday.controls['end'].setValue(this.workedDays[5].endTime);
        }

        let saturday: any = this.workedDaysFormGroup.controls['saturday'];
        if(saturday && saturday.controls){
            saturday.controls['start'].setValue(this.workedDays[5].startTime);
            saturday.controls['end'].setValue(this.workedDays[5].endTime);
        }
    }

    verifyField(e: any): void {
        if(e.target.value.toString().length != 5){
            e.target.value = "";
        }
    }

    saveWorkedDays(days: any): void {
        console.log("WorkedDays", days);
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
