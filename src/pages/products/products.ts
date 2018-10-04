import { Component } from '@angular/core';
import { CompanyServiceProvider } from '../../providers/services/company-service';
import { ProductServiceProvider } from '../../providers/services/product-service';
import Utils from '../../utils/utils';

@Component({
    selector: 'products-page',
    templateUrl: './products.html',
    styleUrls: ['./products.css']
})
export class ProductsPage {
    products: Array<any> = [];

    constructor(private companyService: CompanyServiceProvider, private productService: ProductServiceProvider){
        this.companyService.getCompanyByUserLogged().then((company) => {
            this.productService.getAllProductsByCompany(company.id).then((products) => {
                this.products = products;
            }).catch((error) => console.log("Error returning products this company"));
        }).catch((error) => console.log("Error in returning company logged", error.error.error));
    }
}
