export interface IPlan {
  activity?: any;
  date: string;
  id: string;
  notes?: string;
  title?: string;
  type: PlanType;
}

export type OnUpdatePlan = (id: string, key: string, value: any) => void;

export type OnRemovePlan = (id: string) => void;

export enum PlanType {
  Common = 'common',
  Park = 'park',
  Hotel = 'hotel',
  Dining = 'dining',
  Attraction = 'attraction'
}
