import { action, observable } from 'mobx';

interface IPlan {
  date: string;
  id: string;
}

class PlansStore {
  @observable public list: IPlan[] = [];

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
}

export default PlansStore;
