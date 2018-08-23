import { Component } from '@angular/core';
import { CompanyServiceProvider } from '../../providers/services/company-service';
import { Company } from '../../entities/company';
import Utils from '../../utils/utils';

@Component({
    selector: 'companies-page',
    templateUrl: './companies.html',
    styleUrls: ['./companies.css']
})
export class CompaniesPage {
    companies: Array<Company> = [];
    moneyMask = Utils.getMoneyMask();

    constructor(private companyService: CompanyServiceProvider){
        this.companyService.getAllCompanies().then((companies) => {
            this.companies = companies;
        }).catch((error) => console.log("Error"));
    }
}
