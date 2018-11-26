import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterServiceProvider } from '../../providers/services/filter-service';

@Component({
    selector: 'edit-filter-page',
    templateUrl: './edit-filter.html',
    styleUrls: ['./edit-filter.css']
})
export class EditFilterPage {
    formGroup: FormGroup;
    filter: any;

    constructor(private formBuilder: FormBuilder, private router: Router,
                private filterService: FilterServiceProvider,
                private route: ActivatedRoute) {

        this.formGroup = this.formBuilder.group({
            name: ['', [Validators.required]]
        });

        this.route.params.subscribe(params => {
            if (params.hasOwnProperty("id")) {
                this.filterService.getFilter(params['id']).then((filter) => {
                    console.log('Filter', filter);
                    this.formGroup.controls['name'].setValue(filter.name);
                    this.filter = filter;
                }).catch((error) => console.log("Filter", error));
            }
        });
    }

    ngAfterViewInit(): void {
        setTimeout(_ => this.inflateViewInit());
    }

    inflateViewInit() {}

    saveFilter(data): void{
        data.id = this.filter.id;
        this.filterService.updateFilter(data).then(() => {
            this.router.navigate(['/filters']);
        }).catch((error) => console.log("Error", error));
    }
}


