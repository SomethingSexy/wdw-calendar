export interface IPlan {
  activity?: any;
  date: string;
  id: string;
  notes?: string;
  title?: string;
}

export type OnUpdatePlan = (id: string, key: string, value: any) => void;

export type OnRemovePlan = (id: string) => void;
