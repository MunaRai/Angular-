import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {

  transform(orders: any[], keyword?: string): any {
    if (!orders || !keyword) {
      return orders;
    }

    keyword = keyword.toLocaleLowerCase();

    return orders.filter(ord => {
      return (
        ord.orderID.toLocaleLowerCase().match(keyword) ||
        ord.shipper.name.toLocaleLowerCase().match(keyword) ||
        ord.shipper.city.toLocaleLowerCase().match(keyword) ||
        ord.consigny.name.toLocaleLowerCase().match(keyword) ||
        ord.consigny.city.toLocaleLowerCase().match(keyword)
      );
    });
  }

}
