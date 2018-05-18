import { action, observable } from 'mobx';

export interface IUiStore {
  editPlanId?: string | null;
  setEditPlan: (id: string | null) => void;
  setSelectDay: (id: string | null) => void;
  selectedDay?: string | null;
}

class UiStore {
  @observable public editPlanId?: string | null;
  @observable public selectedDay?: string | null;

  @action
  public setEditPlan(id: string | null) {
    this.editPlanId = this.editPlanId === id ? null : id;
  }

  @action
  public setSelectDay(id: string | null) {
    this.selectedDay = id;
  }
}

export default UiStore;
