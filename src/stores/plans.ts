import { action, observable } from 'mobx';
import uuid from 'uuid';
import { IPlan } from '../types';
import { IPlacesStore } from './places';

export interface IPlansStore {
  list: IPlan[];
  addPlan: (plan: { date: string }) => void;
  updateAll: (plans: IPlan[]) => void;
}

class PlansStore {
  @observable public list: IPlan[] = [];

  private places: IPlacesStore;

  constructor(places: IPlacesStore) {
    this.places = places;
  }

  @action
  public addPlan(plan: { date: string }) {
    this.list = [...this.list, { date: plan.date, id: uuid.v4() }];
  }

  public findById(id: string) {
    return this.list.find(plan => plan.id === id);
  }

  @action
  public updateAll(plans: IPlan[]) {
    this.list = plans;
  }

  @action
  public update(plan: IPlan) {
    this.list = this.list.map(listPlan => {
      if (listPlan.id !== plan.id) {
        return listPlan;
      }

      return {
        ...listPlan,
        ...plan
      };
    });
  }

  @action
  public updatePlanActivity(id: string, activityId: string) {
    const plan = this.findById(id);
    const activity = this.places.findById(activityId);

    if (activity && plan) {
      this.update({
        ...plan,
        activity
      });
    }
  }

  @action
  public updatePlanDate(id: string, date: string) {
    const plan = this.findById(id);

    if (date && plan) {
      this.update({
        ...plan,
        date
      });
    }
  }
}

export default PlansStore;
