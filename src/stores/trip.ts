import { action, observable } from 'mobx';
import { range } from 'react-planner';
import { IPlansStore } from './plans';
import { IUiStore } from './ui';

// TODO:
//  - add support for people on this trip
class TripStore {
  @observable public dateStart?: string;
  @observable public days?: number;
  @observable public interval?: string;
  @observable public name?: string;
  @observable public range?: string[];

  private plans: IPlansStore;
  private ui: IUiStore;

  constructor(plans: IPlansStore, ui: IUiStore) {
    this.plans = plans;
    this.ui = ui;
  }

  @action
  public addDay() {
    this.days = (this.days || 0) + 1;
    this.range = range(this.dateStart, this.days);
  }

  @action
  public addPlan(date: string) {
    this.plans.addPlan({ date });
  }

  @action
  public set(settings: any) {
    this.dateStart = settings.dateStart;
    this.days = settings.days;
    this.interval = settings.interval;
    this.name = settings.name;
    this.range = range(this.dateStart, this.days);
    // automatically default the selected day
    this.ui.setSelectDay(this.range ? this.range[0] : null);
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
    this.name = settings.name;
    this.range = range(this.dateStart, this.days);
    // for now automatically set the selected day
    this.ui.setSelectDay(this.range ? this.range[0] : null);
  }
}

export default TripStore;
