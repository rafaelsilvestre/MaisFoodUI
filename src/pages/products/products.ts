import { Component } from '@angular/core';
import {Company} from '../../entities/company';
import Utils from '../../utils/utils';
import {CompanyServiceProvider} from '../../providers/services/company-service';

@Component({
    selector: 'products-page',
    templateUrl: './products.html',
    styleUrls: ['./products.css']
})
export class ProductsPage {
    products: Array<Company> = [];

    constructor(private companyService: CompanyServiceProvider){
        this.companyService.getAllCompanies().then((companies) => {
            this.products = companies;
        }).catch((error) => console.log("Error"));
    }
}
