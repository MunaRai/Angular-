import { Order } from '@shared/models/order.model';
import { ClientMaster } from '@shared/models/client-master.model';
import { CommodityCode } from '@shared/models/commodity-code.model';
import { Tracker } from '@shared/models/tracker.model';

export class OrderAssign{
    orderAssignId: string;
    orderAssign: string;
    orderAssignOrderManagementIds: string[] =[];
    orderAssigntrackerId: string;
    orderAssignDriverId?: string;
    orderAssignDateLong?: string;
    orderAssignStatus?: string;
    orderAssignDescription?: string;
    orderAssingOrderManagementDtoList: Order[] = [];
    commodityDto: CommodityCode[] = [];
    orderAssignTrackerDto: Tracker;
    orderAssignDateCreated: Date;
}