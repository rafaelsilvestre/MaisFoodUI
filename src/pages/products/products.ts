import { Component } from '@angular/core';
import { CompanyServiceProvider } from '../../providers/services/company-service';
import { ProductServiceProvider } from '../../providers/services/product-service';
import Utils from '../../utils/utils';
import swal from "sweetalert2";

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

    deleteProduct(productId, i) : void {
        swal({
            title: 'Deseja apagar este produto?',
            confirmButtonText:  'Sim',
            cancelButtonText:  'Nãoا',
            showCancelButton: true,
            showCloseButton: true
        }).then((result) => {
            if (result.value) {
                this.productService.deleteProduct(productId).then(() => {
                    this.products.splice(i, 1);
                }).catch((error) => console.log("Error", error));
            }
        });
    }
}
