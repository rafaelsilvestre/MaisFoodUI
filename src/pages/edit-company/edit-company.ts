import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Utils from '../../utils/utils';
import {Filter} from '../../entities/filter';
import {CompanyServiceProvider} from '../../providers/services/company-service';
import {ActivatedRoute, Router} from '@angular/router';
import {FilterServiceProvider} from '../../providers/services/filter-service';
import swal from "sweetalert2";
import {MoneyPipe} from '../../pipes/money-mask/money-mask';

@Component({
    selector: 'edit-company-page',
    templateUrl: './edit-company.html',
    styleUrls: ['./edit-company.css']
})
export class EditCompanyPage {
    @ViewChild('image') companyImage: ElementRef;
    formGroup: FormGroup;
    moneyMask: any = Utils.getMoneyMask();
    fileImage: any = null;
    company: any;

    filters: Array<Filter> = [];
    filtersChecked: Array<number> = [];
    filterPrimaryColumn: Array<Filter> = [];
    filterSecondColumn: Array<Filter> = [];

    constructor(private formBuilder: FormBuilder, private companyService: CompanyServiceProvider,
                private router: Router, private filterService: FilterServiceProvider,
                private route: ActivatedRoute) {

        this.formGroup = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', Validators.required],
            minimum_value: ['', [Validators.required]],
            file: ['', [Validators.required]]
        });

        this.route.params.subscribe(params => {
            if (params.hasOwnProperty("id")) {
                this.companyService.getCompanyById( params["id"]).then((company) => {
                    this.company = company;
                    this.resolveCompanyData();
                }).catch((error) => console.log('Error', error));
            }
        });

        this.filterService.getAllFilters().then((filters) => {
            this.filters = filters;
            filters.forEach((filter, i) => {
                if(i < Math.round(filters.length / 2)){
                    this.filterPrimaryColumn.push(filters[i]);
                }else{
                    this.filterSecondColumn.push(filters[i]);
                }
            });
        }).catch((error) => {
            if(error && error.error && error.error.message){
                console.info("Error", error.error.message);
            }
        });
    }

    ngAfterViewInit(): void {
        setTimeout(_ => this.inflateViewInit());
    }

    inflateViewInit() {}

    resolveCompanyData(): void {
        this.formGroup.controls['name'].setValue(this.company && this.company.name ? this.company.name : '');
        this.formGroup.controls['description'].setValue(this.company && this.company.description ? this.company.description : '')
        this.formGroup.controls['minimum_value'].setValue(this.company && this.company.minimumValue ? new MoneyPipe().transform(this.company.minimumValue) : '');

        if(this.company && this.company.image){
            this.companyImage.nativeElement.style.backgroundImage = "url(" + this.company.image + ")";
            this.formGroup.controls['file'].setValidators([]);
            this.formGroup.controls['file'].updateValueAndValidity();
        }
    }

    saveCompany(formData: any): void {
        formData.minimum_value = formData.minimum_value.replace('R$ ', '').replace(',', '.');

        formData.categories = [];

        this.filtersChecked.forEach((filterId) => {
            let i = this.filters.map((e) => { return e.id; }).indexOf(filterId);
            formData.categories.push(this.filters[i]);
        });

        let data = {
            companyName: formData.name,
            description: formData.description,
            minimumValue: Number(formData.minimum_value),
        };

        this.companyService.updateCompany(this.company.id, data).then((result) => {
            if(result.id != null){
                if(this.fileImage != null){
                    this.companyService.saveImageCompany(this.fileImage, result.id).then(() => {
                        this.router.navigate(['/companies']);
                    }).catch((error) => console.log('Error', error));
                }else{
                    this.router.navigate(['/companies']);
                }
            }
        }).catch((error) => console.log("Error", error));
    }

    checkedFilter(filter: Filter, isChecked: boolean): void {
        let i = this.filtersChecked.map(function(e) { return e }).indexOf(filter.id);

        if(isChecked)
            this.filtersChecked.push(filter.id);
        else
            this.filtersChecked.splice(i, 1);
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


