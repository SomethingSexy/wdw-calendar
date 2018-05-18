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
    // adding this here in case adjusts need to get
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
  public removeDay(date: string) {
    // Removing a day will just remove all of the plans for that day
    // then shift the days.  This might be pointless.
    this.range = this.range ? this.range.filter(d => d !== date) : [];
    this.days = this.days ? this.days - 1 : 0;

    if (this.dateStart === date) {
      this.dateStart = this.range[0];
    }

    if (this.ui.selectedDay === date) {
      this.ui.setSelectDay(this.range[0]);
    }

    // also need to delete any plans associated with this date
    const plans = this.plans.findByDate(date);

    this.plans.remove(plans);
  }

  @action
  public removePlan(id: string) {
    const plan = this.plans.findById(id);

    if (plan) {
      if (this.ui.editPlanId === id) {
        this.ui.setEditPlan(null);
      }
      this.plans.remove([plan]);
    }
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

  @action
  public updatePlan(id: string, name: string, value: any) {
    // TODO: Should I keep plans separate or should I just merge everything here?
    const plan = this.plans.updatePlanField(id, name, value);

    if (plan && plan.date !== this.ui.selectedDay) {
      this.ui.setSelectDay(plan.date);
    }
  }
}

export default TripStore;
