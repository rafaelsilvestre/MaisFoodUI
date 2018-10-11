import { Component } from '@angular/core';
import {CategoryServiceProvider} from '../../providers/services/category-service';

@Component({
    selector: 'categories-page',
    templateUrl: './categories.html',
    styleUrls: ['./categories.css']
})
export class CategoriesPage {
    categories: Array<any> = [];

    constructor(private categoryService: CategoryServiceProvider){
        this.categoryService.getAllCategories().then((categories) => {
           this.categories = categories;
        });
    }
}
