import { Address } from '@shared/models/address.model';
import { generateId } from '@shared/helpers/helper';

export class ClientMaster {
  clientMasterId: string;
  clientId: String;
  clientMasterFirstName: string;
  clientMasterMiddleName: string;
  clientMasterLastName: string;
  clientMasterPhone: string;
  clientMasterEmail: string;
  clientMasterAddress: Address;
  debtor: boolean;
  clientMasterAddressLat: number;
  clientMasterAddressLong: number;
  result: ClientMaster[];
  constructor(
  ) {
    this.clientMasterId = generateId('CI');
    this.clientMasterAddress = new Address();
    this.debtor = false;
  }
}
