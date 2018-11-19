import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'permission',
})
export class PermissionConverterPipe implements PipeTransform {
    transform(value: string, ...args) {
        let permission = '';
        switch (value) {
            case 'ADMIN':
                permission = 'Admin';
                break;
            case 'COMPANY':
                permission = 'Empresa';
                break;
            case 'CLIENT':
                permission = 'Cliente';
                break;
        }

        return permission;
    }
}
