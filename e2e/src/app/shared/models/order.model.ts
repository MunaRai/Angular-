
import { CommodityCode } from '@shared/models/commodity-code.model';
import { ClientMaster } from '@shared/models/client-master.model';
import { generateId } from '@shared/helpers/helper';
import { OrderBill } from './orderBill.model';
export class Order {
  orderId: string;
  orderManagementId: string;
  orderManagementCommodityId: string;
  orderManagementShipperId: string;
  orderManagementConsignyId: string;
  orderManagementBillStatus: string;
  orderManagementStatus: string;
  orderManagementShipper?: ClientMaster;
  orderManagementConsigny?: ClientMaster;
  orderManagementBill?: OrderBill;
  commodityDto?: CommodityCode;
  orderManagementSignatureImg:string;
  orderManagementProfileImg:string;
  orderManagementDateCreated: Date;
  // status: string;
  // datePickup: Date;
  // dateDelivery: Date;
  // dateCreated: Date;
  // dateModified: Date;
  orderMngFrieghtDetails: Freight;

  constructor() {
    // this.orderId = generateId('ORD');
    // this.dateCreated = new Date();
    // this.dateModified = new Date();
    // this.status = 'available';
    // this.shipper = new ClientMaster();
    // this.consigny = new ClientMaster();
    // this.commodityCode = new CommodityCode();
  }
}

export class Freight {
  orderMngFrieghtPickupDate?: Date;
  orderMngFrieghtDeliveryDate?: Date;
  orderMngFrieghtPieces?: number;
  orderMngFrieghtWeight?: number;
  orderMngFrieghtHeight?: number;
  orderMngFrieghtlenght?: number;
  orderMngFrieghtWidth?: number;
  orderMngFrieghtRate?: number;
  orderMngFrieghtCube?: number;
}
