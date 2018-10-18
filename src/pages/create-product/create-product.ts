import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServiceProvider } from '../../providers/services/product-service';
import { CompanyServiceProvider } from '../../providers/services/company-service';
import { CategoryServiceProvider } from '../../providers/services/category-service';
import Utils from '../../utils/utils';

@Component({
    selector: 'create-product-page',
    templateUrl: './create-product.html',
    styleUrls: ['./create-product.css']
})
export class CreateProductPage {
    formGroup: FormGroup;
    categories: Array<any> = [];
    moneyMask = Utils.getMoneyMask();

    constructor(private formBuilder: FormBuilder, private router: Router,
                private productService: ProductServiceProvider, private companyService: CompanyServiceProvider,
                private categoryService: CategoryServiceProvider) {

        this.categoryService.getAllCategories().then((categories) => {
            this.categories = categories;
        }).catch((error) => console.log("Error", error));

        this.formGroup = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            category: ['', Validators.required],
            price: ['', [Validators.required]]
        });
    }

    saveProduct(data): void{
        data.price = data.price.replace('R$ ', '').replace(',', '.');

        this.companyService.getCompanyByUserLogged().then((company) => {
            this.productService.saveProductByCompany(company.id, data).then((result) => {
                this.router.navigate(['/products']);
            }).catch((error) => console.log("Error", error));
        });
    }
}
