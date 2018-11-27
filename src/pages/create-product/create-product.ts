import {Component, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServiceProvider } from '../../providers/services/product-service';
import { CompanyServiceProvider } from '../../providers/services/company-service';
import { CategoryServiceProvider } from '../../providers/services/category-service';
import Utils from '../../utils/utils';
import swal from "sweetalert2";

@Component({
    selector: 'create-product-page',
    templateUrl: './create-product.html',
    styleUrls: ['./create-product.css']
})
export class CreateProductPage {
    formGroup: FormGroup;
    categories: Array<any> = [];
    moneyMask = Utils.getMoneyMask();

    @ViewChild('image') companyImage: ElementRef;
    fileImage: any = null;

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
            price: ['', [Validators.required]],
            file: ['', [Validators.required]]
        });
    }

    saveProduct(data): void{
        data.price = data.price.replace('R$ ', '').replace(',', '.');

        this.companyService.getCompanyByUserLogged().then((company) => {
            data.category = {
                id: data.category
            };
            this.productService.saveProductByCompany(company.id, data).then((result) => {
                if(result && result.id != null && this.fileImage != null){
                    this.productService.saveImageProduct(this.fileImage, result.id).then(() => {
                        this.router.navigate(['/products']);
                    }).catch((error) => console.log("Error", error));
                }
            }).catch((error) => console.log("Error", error));
        });
    }

    uploadFile($event): void {
        let image: any = new Image();
        let file: File = $event.target.files[0];
        let myReader: FileReader = new FileReader();

        myReader.onloadend = (loadEvent: any) => {
            image.src = loadEvent.target.result;
            this.fileImage = file;
            this.companyImage.nativeElement.style.backgroundImage = "url(" + image.src + ")";
        };

        if(file != null) {
            let validImageTypes = ["image/jpeg", "image/png"];
            if(validImageTypes.indexOf(file.type) < 0) {
                swal({
                    title: 'Formato do arquivo enviado não é válido!',
                    confirmButtonText:  'Ok',
                    showCancelButton: false,
                    showCloseButton: false
                });
                return;
            } else {
                myReader.readAsDataURL(file);
            }
        }
    }
}
