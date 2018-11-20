import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Utils from '../../utils/utils';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductServiceProvider} from '../../providers/services/product-service';
import {CompanyServiceProvider} from '../../providers/services/company-service';
import {CategoryServiceProvider} from '../../providers/services/category-service';
import {MoneyPipe} from '../../pipes/money-mask/money-mask';
import swal from "sweetalert2";

@Component({
    selector: 'edit-product-page',
    templateUrl: './edit-product.html',
    styleUrls: ['./edit-product.css']
})
export class EditProductPage {
    @ViewChild('image') companyImage: ElementRef;
    fileImage: any = null;
    formGroup: FormGroup;
    product: any;
    categories: Array<any> = [];
    moneyMask = Utils.getMoneyMask();

    constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
                private productService: ProductServiceProvider, private companyService: CompanyServiceProvider,
                private categoryService: CategoryServiceProvider) {

        this.route.params.subscribe(params => {
            if (params.hasOwnProperty("id")) {
                this.productService.getProductById(params['id']).then((product) => {
                    this.product = product;
                    this.resolveFormData();
                }).catch((error) => console.log("Error", error));
            }
        });

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

    resolveFormData(): void {
        if(this.product == null ) return;

        this.formGroup.controls['name'].setValue(this.product.name);
        this.formGroup.controls['description'].setValue(this.product.description);
        this.formGroup.controls['category'].setValue(this.product.category.id);
        this.formGroup.controls['price'].setValue(new MoneyPipe().transform(this.product.price));
    }

    updateProduct(data): void{
        if(isNaN(data.price))
        data.price = data.price.toString().replace('R$ ', '').replace(',', '.');

        this.productService.updateProduct(this.product.id, data).then((result) => {
            this.productService.saveImageProduct(this.fileImage, this.product.id).then(() => {
                this.router.navigate(['/products']);
            }).catch((error) => console.log("Error", error));
        }).catch((error) => console.log("Error", error));
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
