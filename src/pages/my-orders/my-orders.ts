import { Component } from '@angular/core';
import {OrderServiceProvider} from '../../providers/services/order-service';

@Component({
    selector: 'my-orders-page',
    templateUrl: './my-orders.html',
    styleUrls: ['./my-orders.css']
})
export class MyOrdersPage {
    orders: Array<any> = [];

    constructor(private orderService: OrderServiceProvider){
        this.orderService.getAllMyOrder().then((orders) => {
            this.orders = orders;
            console.log(orders);
        }).catch((error) => console.log("Error", error));
    }
}
