import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CompanyServiceProvider } from '../../providers/services/company-service';

@Component({
    selector: 'company-page',
    templateUrl: './company.html',
    styleUrls: ['./company.css']
})
export class CompanyPage {
    companyId: number;

    constructor(private companyService: CompanyServiceProvider, private route: ActivatedRoute){
        this.route.params.subscribe(params => {
            if (params.hasOwnProperty("id")) {
                this.companyId = params['id'];
            }
        });
    }
}
