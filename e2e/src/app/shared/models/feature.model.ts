import { generateId } from "@shared/helpers/helper";

export class Feature {
  featureId: string;
  featureName: string;
  featureType: string;
  featureDisable?: boolean;
  featureDateCreated?: number;
  featureDateModified?: number;
  featureCreatedBy?: String;
  featureModifiedBy?: String;

  constructor(name = '', type = 'tracker') {
    this.featureId = generateId();
    this.featureName = name;
    this.featureType = type;
    this.featureDateCreated = new Date().getTime();
    this.featureDateModified = new Date().getTime();
  }
}
