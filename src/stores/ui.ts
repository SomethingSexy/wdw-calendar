import { action, observable } from 'mobx';

export interface IUiStore {
  setSelectDay: (id: string | null) => void;
  selectedDay?: string | null;
}

class UiStore {
  @observable public editPlanId?: string;
  @observable public selectedDay?: string | null;

  @action
  public setEditPlan(id: string) {
    this.editPlanId = id;
  }

  @action
  public setSelectDay(id: string | null) {
    this.selectedDay = id;
  }
}

export default UiStore;
