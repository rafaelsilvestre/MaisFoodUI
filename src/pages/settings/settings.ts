import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Utils from '../../utils/utils';
import {min} from 'rxjs/internal/operators';

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

    constructor(private formBuilder: FormBuilder){
        this.settingsFormGroup = this.formBuilder.group({
            name: ["", [Validators.required]],
            description: ["", [Validators.required]],
            minimumValue: ["", Validators.required]
        });

        this.workedDaysFormGroup = this.formBuilder.group({
            monday: this.formBuilder.group({
                start: ["", Validators.minLength(5)],
                end: ["", Validators.minLength(5)]
            }),
            tuesday: this.formBuilder.group({
                start: ["", Validators.minLength(5)],
                end: ["", Validators.minLength(5)]
            }),
            wednesday: this.formBuilder.group({
                start: ["", Validators.minLength(5)],
                end: ["", Validators.minLength(5)]
            }),
            thursday: this.formBuilder.group({
                start: ["", Validators.minLength(5)],
                end: ["", Validators.minLength(5)]
            }),
            friday: this.formBuilder.group({
                start: ["", Validators.minLength(5)],
                end: ["", Validators.minLength(5)]
            }),
            saturday: this.formBuilder.group({
                start: ["", Validators.minLength(5)],
                end: ["", Validators.minLength(5)]
            }),
            sunday: this.formBuilder.group({
                start: ["", Validators.minLength(5)],
                end: ["", Validators.minLength(5)]
            })
        });

        console.log();
    }

    saveSettings(data): void {
        console.log(data);
    }
}
