import { Component } from '@angular/core';
import { DistrictServiceProvider } from '../../providers/services/district-service';

@Component({
    selector: 'districts-page',
    templateUrl: './districts.html',
    styleUrls: ['./districts.css']
})
export class DistrictsPage {
    districts: Array<any> = [];
    isLoading: boolean = true;

    constructor(private districtService: DistrictServiceProvider){
        this.districtService.getAllDistricts().then((districts) => {
            setTimeout(() => {
                this.districts = districts;
            }, 1000);

            setTimeout(() => {
                this.isLoading = false;
            }, 2000);
        }).catch((error) => {
            if(error && error.error && error.error.message){
                console.info("Error", error.error.message);
            }
        });
    }
}
