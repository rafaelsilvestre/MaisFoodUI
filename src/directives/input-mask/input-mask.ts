import { Directive, Input } from '@angular/core';
import { NgModel, NgControl } from '@angular/forms';

@Directive({
    selector: '[mask]',
    host: {
        '(keyup)': 'onInputChange($event)'
        // , '(keydown)': 'checkDisable($event)',
    },
    providers: [NgModel]
})
export class InputMaskDirective {

    @Input('maskPatterns')
    maskPatterns: Array<any>;

    constructor(public model: NgModel, public control: NgControl) {}

    checkDisable(event) {
        if(this.maskPatterns == null) {
            return;
        }

        // Trigger submit on enter...
        if(event.keyCode == 13) {
            let formControl = (this.model && this.model.formDirective) ? this.model.formDirective : null;
            let submitEventEmitter = (this.model && this.model.formDirective && this.model.formDirective.ngSubmit) ?
                this.model.formDirective.ngSubmit : null;
            if(formControl && formControl.valid === true && submitEventEmitter) {
                submitEventEmitter.emit();
                event.preventDefault();
            }
            return;
        }

        // Bypass special keys...
        let continueKeyCodes = [37, 39, 8, 9];
        if(continueKeyCodes.indexOf(event.keyCode) >= 0) {
            return;
        }

        // Numpad keys adjustment
        let keyCode = event.keyCode || event.which;
        if (keyCode >= 96 && keyCode <= 105) {
            keyCode -= 48;
        }
        let newKeyValue = String.fromCharCode(keyCode);

        let value = event.target.value + newKeyValue;
        let maskPatterns = (<any>this.maskPatterns)(value);
        if(value.length > maskPatterns.length) {
            event.preventDefault();
            return;
        }
    }

    onInputChange(event) {
        if(this.maskPatterns == null) {
            return;
        }

        let newValue = InputMaskDirective.conformValueToMask(event.target.value, this.maskPatterns);
        this.model.update.emit(newValue);
        if(this.control.control) {
            this.control.control.setValue(newValue);
        }
    }

    public static conformValueToMask(value, mask) : string {
        if(mask == null) {
            return value;
        }

        value = value.toString();
        let formatted = '';
        let maskPatterns = (<any>mask)(value);
        let maskLen = maskPatterns.length;
        for(let i = 0; i <= maskPatterns.length; i++) {
            let regexExp = (maskPatterns[i] instanceof RegExp) ? maskPatterns[i] : null;
            if(regexExp == null) {
                if(maskPatterns[i] != null) {
                    formatted += maskPatterns[i];
                }
                let actualChar = value[0];
                if(actualChar == maskPatterns[i] && value && value.length > 0) {
                    value = value.slice(1);
                }
            } else {
                let valLen = value.length;
                for(let j = 0; j < valLen; j++) {
                    if(regexExp.test(value[0])) {
                        formatted += value[0];
                        value = value.slice(1);
                        break;
                    } else {
                        value = value.slice(1);
                    }
                }
            }

            if(value.length == 0) {
                break;
            }
        }

        return formatted.substr(0, maskLen);
    }
}
