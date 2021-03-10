
export class CommodityCode {
  commodityCodeId: string;
  commodityCode: string;
  commodityCodeDescription: string;
  commodityDateCreated?: number;
  commodityDateModified?: number;

  constructor(commodityCodeId = '', commodityCode ='', commodityCodeDescription = '') {
    this.commodityCodeId = commodityCodeId;
    this.commodityCode = commodityCode;
    this.commodityCodeDescription = commodityCodeDescription;
  }
}
