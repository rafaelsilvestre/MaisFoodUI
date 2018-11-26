import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import Utils from '../../utils/utils';
import { CompanyServiceProvider } from '../../providers/services/company-service';
import {MoneyPipe} from '../../pipes/money-mask/money-mask';
import { TypeDay } from '../../enums/type-day';
import swal from "sweetalert2";
import {DistrictServiceProvider} from '../../providers/services/district-service';

@Component({
    selector: 'settings-page',
    templateUrl: './settings.html',
    styleUrls: ['./settings.css']
})
export class SettingsPage {
    @ViewChild('image') companyImage: ElementRef;
    fileImage: any = null;
    settingsFormGroup: FormGroup;
    workedDaysFormGroup: FormGroup;
    moneyMask: any = Utils.getMoneyMask();
    hourMask = Utils.getHourMask();
    company: any;
    workedDays: Array<any> = [];

    companyDistricts = [];
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    isLoadingDistrict: boolean = true;

    constructor(private formBuilder: FormBuilder, private companyService: CompanyServiceProvider, private districtService: DistrictServiceProvider){
        this.settingsFormGroup = this.formBuilder.group({
            name: ["", [Validators.required]],
            description: ["", [Validators.required]],
            minimumValue: ["", Validators.required],
            file: ['', [Validators.required]]
        });

        this.companyService.getCompanyByUserLogged().then((company) => {
            this.company = company;
            this.resolveCompanyData();

            this.companyService.getWorkedDays(company.id).then((workedDays) => {
                this.workedDays = workedDays;
                this.resolveWorkedDays();
            }).catch((error) => console.log("Error", error));

            this.districtService.getAllDistrictsByCompany(company.id).then((companyDistricts) => {
                this.companyDistricts = companyDistricts;
                this.selectedItems = companyDistricts;
            }).catch((error) => console.log("Error", error));
        }).catch((error) => console.log("Error", error));

        this.districtService.getAllDistricts().then((districts) => {
            this.dropdownList = districts;
            this.isLoadingDistrict = false;
        }).catch((error) => console.log("Error", error));

        this.workedDaysFormGroup = this.formBuilder.group({
            '0': this.formBuilder.group({
                start: ["", [Validators.required, Validators.minLength(5)]],
                end: ["", [Validators.required, Validators.minLength(5)]],
                enabled: [false]
            }),
            '1': this.formBuilder.group({
                start: ["", [Validators.required, Validators.minLength(5)]],
                end: ["", [Validators.required, Validators.minLength(5)]],
                enabled: [false]
            }),
            '2': this.formBuilder.group({
                start: ["", [Validators.required, Validators.minLength(5)]],
                end: ["", [Validators.required, Validators.minLength(5)]],
                enabled: [false]
            }),
            '3': this.formBuilder.group({
                start: ["", [Validators.required, Validators.minLength(5)]],
                end: ["", [Validators.required, Validators.minLength(5)]],
                enabled: [false]
            }),
            '4': this.formBuilder.group({
                start: ["", [Validators.required, Validators.minLength(5)]],
                end: ["", [Validators.required, Validators.minLength(5)]],
                enabled: [false]
            }),
            '5': this.formBuilder.group({
                start: ["", [Validators.required, Validators.minLength(5)]],
                end: ["", [Validators.required, Validators.minLength(5)]],
                enabled: [false]
            }),
            '6': this.formBuilder.group({
                start: ["", [Validators.required, Validators.minLength(5)]],
                end: ["", [Validators.required, Validators.minLength(5)]],
                enabled: [false]
            })
        });
    }

    ngOnInit() {
        this.selectedItems = [];

        this.dropdownSettings = {
            singleSelection: false,
            enableCheckAll: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Selecionar todos',
            unSelectAllText: 'Deselecionar todos',
            itemsShowLimit: 8,
            allowSearchFilter: true
        };
    }

    onItemSelect(item: any) {
        this.districtService.saveDistrictsByCompany(this.company.id, item).then(() => {

        }).catch((error) => {
            swal({
                title: 'Erro ao salvar Bairro!',
                confirmButtonText:  'Ok',
                showCancelButton: false,
                showCloseButton: false
            });
            console.log("Error", error);
        });
    }

    onItemDeSelect(item: any) {
        this.districtService.deleteDistrictsByCompany(this.company.id, item).then(() => {

        }).catch((error) => {
            swal({
                title: 'Erro ao remover Bairro!',
                confirmButtonText:  'Ok',
                showCancelButton: false,
                showCloseButton: false
            });
            console.log("Error", error);
        });
    }

    resolveCompanyData(): void {
        if(this.company == null) return;

        this.settingsFormGroup.controls['name'].setValue(this.company.name);
        this.settingsFormGroup.controls['description'].setValue(this.company.description);
        this.settingsFormGroup.controls['minimumValue'].setValue(new MoneyPipe().transform(this.company.minimumValue));

        if(this.company && this.company.image){
            this.companyImage.nativeElement.style.backgroundImage = "url(" + this.company.image + ")";
            this.settingsFormGroup.controls['file'].setValidators([]);
            this.settingsFormGroup.controls['file'].updateValueAndValidity();
        }
    }

    resolveWorkedDays(): void {
        let sunday: any = this.workedDaysFormGroup.controls['0'];
        let monday: any = this.workedDaysFormGroup.controls['1'];
        let tuesday: any = this.workedDaysFormGroup.controls['2'];
        let wednesday: any = this.workedDaysFormGroup.controls['3'];
        let thursday: any = this.workedDaysFormGroup.controls['4'];
        let friday: any = this.workedDaysFormGroup.controls['5'];
        let saturday: any = this.workedDaysFormGroup.controls['6'];

        if(this.workedDays.length == 0){
            sunday.controls['enabled'].disable();
            monday.controls['enabled'].disable();
            tuesday.controls['enabled'].disable();
            wednesday.controls['enabled'].disable();
            thursday.controls['enabled'].disable();
            friday.controls['enabled'].disable();
            saturday.controls['enabled'].disable();
        }

        this.workedDays.forEach((workedDay: any) => {
            if(workedDay.day == TypeDay.SUNDAY){
                if(sunday && sunday.controls){
                    sunday.controls['start'].setValue(workedDay.startTime);
                    sunday.controls['end'].setValue(workedDay.endTime);
                    if(!workedDay.enabled){
                        this.disableDay(sunday, !workedDay.enabled);
                        sunday.controls['enabled'].setValue(true);
                    }
                }
            }

            if(workedDay.day == TypeDay.MONDAY){
                if(monday && monday.controls){
                    monday.controls['start'].setValue(workedDay.startTime);
                    monday.controls['end'].setValue(workedDay.endTime);
                    if(!workedDay.enabled){
                        this.disableDay(monday, !workedDay.enabled);
                        monday.controls['enabled'].setValue(true);
                    }
                }
            }

            if(workedDay.day == TypeDay.TUESDAY){
                if(tuesday && tuesday.controls){
                    tuesday.controls['start'].setValue(workedDay.startTime);
                    tuesday.controls['end'].setValue(workedDay.endTime);
                    if(!workedDay.enabled){
                        this.disableDay(tuesday, !workedDay.enabled);
                        tuesday.controls['enabled'].setValue(true);
                    }
                }
            }

            if(workedDay.day == TypeDay.WEDNESDAY){
                if(wednesday && wednesday.controls){
                    wednesday.controls['start'].setValue(workedDay.startTime);
                    wednesday.controls['end'].setValue(workedDay.endTime);
                    if(!workedDay.enabled){
                        this.disableDay(wednesday, !workedDay.enabled);
                        wednesday.controls['enabled'].setValue(true);
                    }
                }
            }

            if(workedDay.day == TypeDay.THURSDAY){
                if(thursday && thursday.controls){
                    thursday.controls['start'].setValue(workedDay.startTime);
                    thursday.controls['end'].setValue(workedDay.endTime);
                    if(!workedDay.enabled){
                        this.disableDay(thursday, !workedDay.enabled);
                        thursday.controls['enabled'].setValue(true);
                    }
                }
            }

            if(workedDay.day == TypeDay.FRIDAY){
                if(friday && friday.controls){
                    friday.controls['start'].setValue(workedDay.startTime);
                    friday.controls['end'].setValue(workedDay.endTime);
                    if(!workedDay.enabled){
                        this.disableDay(friday, !workedDay.enabled);
                        friday.controls['enabled'].setValue(true);
                    }
                }
            }

            if(workedDay.day == TypeDay.SATURDAY){
                if(saturday && saturday.controls){
                    saturday.controls['start'].setValue(workedDay.startTime);
                    saturday.controls['end'].setValue(workedDay.endTime);
                    if(!workedDay.enabled){
                        this.disableDay(saturday, !workedDay.enabled);
                        saturday.controls['enabled'].setValue(true);
                    }
                }
            }
        });
    }

    verifyField(e: any): void {
        if(e.target.value.toString().length != 5){
            e.target.value = "";
        }
    }

    saveWorkedDays(days: any): void {
        let workedDays: Array<any> = [];
        for(let day in days){
            workedDays.push({
                day: Number(day),
                startTime: days[day].start,
                endTime: days[day].end,
                enabled: this.workedDays.length == 0 ? true : !days[day].enabled
            });
        }


        this.companyService.saveWorkedDays(workedDays).then(() => {
            swal({
                title: 'Dados salvos com sucesso!',
                confirmButtonText:  'Ok',
                showCancelButton: false,
                showCloseButton: false
            });
        }).catch((error) => {
            let errorMessage = (error && error.error ? error.error.error : "Erro ao salvar dados!");
            swal({
                title: errorMessage,
                confirmButtonText:  'Ok',
                showCancelButton: false,
                showCloseButton: false
            });
        });
    }

    saveSettings(data): void {
        if(isNaN(data.minimumValue))
            data.minimumValue = data.minimumValue.toString().replace('R$ ', '').replace(',', '.');
        data.companyName = data.name;
        this.companyService.getCompanyByUserLogged().then((company) => {
            this.companyService.updateCompany(company.id, data).then(() => {
                if(this.fileImage != null){
                    this.companyService.saveImageCompany(this.fileImage, company.id).then(() => {
                        // sucessfully
                    }).catch((error) => console.log('Error', error));
                }
                swal({
                    title: 'Dados salvos com sucesso!',
                    confirmButtonText:  'Ok',
                    showCancelButton: false,
                    showCloseButton: false
                });
            }).catch((error) => console.log("Error", error));
        }).catch((error) => console.log("Error", error));
        console.log(data);
    }

    disableDay(fieldDay: any, isChecked: boolean): void { }

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
