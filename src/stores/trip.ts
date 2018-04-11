import { action, observable } from 'mobx';
import { range } from 'react-planner';
import { IPlansStore } from './plans';

class TripStore {
  @observable public dateStart?: string;
  @observable public days?: number;
  @observable public interval?: string;

  private plans: IPlansStore;

  constructor(plans: IPlansStore) {
    this.plans = plans;
  }

  @action
  public set(settings: any) {
    this.dateStart = settings.dateStart;
    this.days = settings.days;
    this.interval = settings.interval;
  }

  @action
  public update(settings: any) {
    // TODO: We need to check here if we are breaking existing plans.
    // if days decrease, drop any plans.
    // if start date changes, just adjust the plans accordingly
    const { dateStart, days, interval } = settings;
    if (this.plans.list.length > 0) {
      let plans;
      if (this.days && days < this.days) {
        const datesToKeep = range(this.dateStart, days);
        // remove any dates that are not in this list
        plans = this.plans.list.filter(plan => datesToKeep.includes(plan.date));
      }

      // now check if the dates have changed
      // given the date start and the days,
      if (this.dateStart !== dateStart) {
        const datesToKeep = range(dateStart, days);
        const oldRange = range(this.dateStart, days);

        plans = (plans || this.plans.list).map(plan => {
          const index = oldRange.indexOf(plan.date);
          return {
            ...plan,
            date: datesToKeep[index]
          };
        });
      }

      if (plans) {
        this.plans.updateAll(plans);
      }
    }

    this.dateStart = dateStart;
    this.days = days;
    this.interval = interval;
  }
}

export default TripStore;
