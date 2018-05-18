import { action, observable } from 'mobx';
import uuid from 'uuid';
import { IPlan } from '../types';
import { IPlacesStore } from './places';

export interface IPlansStore {
  list: IPlan[];
  addPlan: (plan: { date: string }) => void;
  findByDate: (date: string) => IPlan[];
  findById: (id: string) => IPlan | undefined;
  remove: (plans: IPlan[]) => void;
  updateAll: (plans: IPlan[]) => void;
  updatePlanField: (id: string, key: string, value: any) => IPlan | undefined;
}

// TODO: Plan should include
// - name
// - notes
// - acivity -> link to place
// - people
// - start time, end time
// - reservation yes/no (used for fastpass OR dining)
//
class PlansStore {
  @observable public list: IPlan[] = [];

  private places: IPlacesStore;

  constructor(places: IPlacesStore) {
    this.places = places;
  }

  @action
  public addPlan(plan: { date: string }) {
    // TODO: find next available time and automatially add
    this.list = [...this.list, { date: plan.date, id: uuid.v4() }];
  }

  public findById(id: string): IPlan | undefined {
    return this.list.find(plan => plan.id === id);
  }

  public findByDate(date: string): IPlan[] {
    return this.list.filter(plan => plan.date === date);
  }

  @action
  public remove(plans: IPlan[]) {
    const ids = plans.map(plan => plan.id);
    this.list = this.list.filter(plan => !ids.includes(plan.id));
  }

  @action
  public updateAll(plans: IPlan[]) {
    this.list = plans;
  }

  @action
  public update(plan: IPlan): IPlan {
    this.list = this.list.map(listPlan => {
      if (listPlan.id !== plan.id) {
        return listPlan;
      }

      return {
        ...listPlan,
        ...plan
      };
    });

    return plan;
  }

  @action
  public updatePlanActivity(id: string, activityId: string) {
    const activity = this.places.findById(activityId);

    if (activity) {
      this.updatePlanField(id, 'activity', activity);
      const plan = this.findById(id);

      if (plan && !plan.title) {
        this.updatePlanField(id, 'title', activity.name);
      }
    }
  }

  @action
  public updatePlanField(id: string, key: string, value: any): IPlan | undefined {
    const plan = this.findById(id);

    if (plan) {
      // return the plan that was updated
      return this.update({
        ...plan,
        [key]: value
      });
    }
  }
}

export default PlansStore;
