export enum WizardEventType {
  prev = 'prev',
  next = 'next',
  finish = 'finish'
}

export interface WizardEvent {
  type: WizardEventType;
  previousIndex: number;
  nextIndex: number;
}

export interface WizardHeaderItem {
  heading: string;
  subHeading: string;
  icon: string;
  isActive?: boolean;
}
