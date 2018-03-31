import { action, observable } from 'mobx';
import { IPlacesStore } from './places';

interface IPlan {
  activity: any;
  date: string;
  id: string;
}

class PlansStore {
  @observable public list: IPlan[] = [];

  private places: IPlacesStore;

  constructor(places: IPlacesStore) {
    this.places = places;
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
}

export default PlansStore;
