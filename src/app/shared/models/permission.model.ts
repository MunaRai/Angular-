import { generateId } from "@shared/helpers/helper";

export class Permission {
  permissionId: string;
  permissionName: string;
  permissionType: string;
  permissionDisable?: boolean;
  permissionDateCreated?: number;
  permissionDateModified?: number;
  permissionCreatedBy?: String;
  permissionModifiedBy?: String;

  constructor(name = '', type = 'normal') {
    this.permissionId = generateId();
    this.permissionName = name;
    this.permissionType = type;
    this.permissionDateCreated = new Date().getTime();
    this.permissionDateModified = new Date().getTime();
  }
}
