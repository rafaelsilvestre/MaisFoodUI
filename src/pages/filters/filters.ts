import { Component } from '@angular/core';
import {FilterServiceProvider} from '../../providers/services/filter-service';
import swal from "sweetalert2";

@Component({
    selector: 'filters-page',
    templateUrl: './filters.html',
    styleUrls: ['./filters.css']
})
export class FiltersPage {
    filters: Array<any> = [];

    constructor(private filterService: FilterServiceProvider) {
        this.filterService.getAllFilters().then((filters) => {
            this.filters = filters;
        }).catch((error) => console.log("Error", error));
    }

    deleteFilter(filterId: number, filterIndex: number): void{
        swal({
            title: 'Deseja apagar este filtro?',
            confirmButtonText:  'Sim',
            cancelButtonText:  'Nãoا',
            showCancelButton: true,
            showCloseButton: true
        }).then((result) => {
            if (result.value) {
                this.filterService.deleteFilter(filterId).then(() => {
                    this.filters.splice(filterIndex, 1);
                }).catch((error) => {
                    swal({
                        title: 'Error',
                        text: 'Não foi possível apagar este filtro!',
                        type: 'error',
                        confirmButtonText: 'Ok'
                    })
                });
            }
        });
    }
}
