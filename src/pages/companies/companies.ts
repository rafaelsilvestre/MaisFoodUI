import { Component } from '@angular/core';
import { CompanyServiceProvider } from '../../providers/services/company-service';
import { Company } from '../../entities/company';
import swal from 'sweetalert2'
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

    editCompany(): void{
        console.log("Editar Empresa");
    }

    deleteCompany(companyId: number, companyIndex: number): void{
        swal({
            title: 'Deseja apagar esta empresa?',
            confirmButtonText:  'Sim',
            cancelButtonText:  'Nãoا',
            showCancelButton: true,
            showCloseButton: true
        }).then((result) => {
            if (result.value) {
                this.companyService.deleteCompany(companyId).then(() => {
                    this.companies.splice(companyIndex, 1);
                }).catch(() => {
                    swal({
                        title: 'Error',
                        text: 'Não foi possível apagar esta empresa!',
                        type: 'error',
                        confirmButtonText: 'Ok'
                    })
                });
            }
        });
    }
}
