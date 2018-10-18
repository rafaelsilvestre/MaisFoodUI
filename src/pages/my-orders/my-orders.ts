import { Component } from '@angular/core';

@Component({
    selector: 'my-orders-page',
    templateUrl: './my-orders.html',
    styleUrls: ['./my-orders.css']
})
export class MyOrdersPage {
    orders: Array<any> = [];
}
