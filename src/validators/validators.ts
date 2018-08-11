import {AbstractControl, ValidatorFn} from '@angular/forms';

export function emailValidator() : ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const value = control.value;
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value) ? null : {'emailValidator': {value}};
    };
}
