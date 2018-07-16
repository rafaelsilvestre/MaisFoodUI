import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Utils from '../../utils/utils';

@Component({
    selector: 'settings-page',
    templateUrl: './settings.html',
    styleUrls: ['./settings.css']
})
export class SettingsPage {
    settingsFormGroup: FormGroup;
    moneyMask: any = Utils.getMoneyMask();

    constructor(private formBuilder: FormBuilder){
        this.settingsFormGroup = this.formBuilder.group({
            name: ["", [Validators.required]],
            description: ["", [Validators.required]],
            minimumValue: ["", Validators.required]
        });
    }

    saveSettings(data): void {
        console.log(data);
    }
}
