import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ProductServiceProvider} from '../../providers/services/product-service';
import {CompanyServiceProvider} from '../../providers/services/company-service';

@Component({
    selector: 'create-product-page',
    templateUrl: './create-product.html',
    styleUrls: ['./create-product.css']
})
export class CreateProductPage {
    formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private router: Router,
                private productService: ProductServiceProvider, private companyService: CompanyServiceProvider) {
        this.formGroup = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            price: ['', [Validators.required]]
        });
    }

    saveProduct(data): void{
        this.companyService.getCompanyByUserLogged().then((company) => {
            this.productService.saveProductByCompany(company.id, data).then((result) => {
                this.router.navigate(['/products']);
            }).catch((error) => console.log("Error", error));
        });
    }
}
