import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Column,
  Columns,
  Panel,
  PanelBlock,
  PanelHeading
} from 'bloomer';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { IPlan } from '../types';
import Day from './Day';
import TripSelectableDay from './TripSelectableDay';

export interface IProps {
  places?: any;
  plans?: any;
  trip?: any;
  ui?: any;
}

interface IState {
  showEditActivity: boolean;
}

@inject('places')
@inject('plans')
@inject('trip')
@inject('ui')
@observer
class Trip extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.places.fetch();
  }

  public render() {
    const { places, trip, ui } = this.props;
    const { isLoading, loaded } = places;

    if (isLoading || !loaded) {
      return <div>Loading...</div>;
    }

    const { plans, range } = trip;
    const { editPlanId, selectedDay } = ui;

    const selectedPlans = plans.list.filter((plan: IPlan) => plan.date === selectedDay);

    const tripSettings = {
      min: range[0],
      max: range[range.length - 1]
    };

    return (
      <Columns>
        <Column isSize={1}>
          <Panel className="days">
            <PanelHeading
              className="has-text-centered"
            >
              <FontAwesomeIcon icon="calendar-alt" />
            </PanelHeading>
            {this.renderDays()}
            <PanelBlock>
              <Button
                isOutlined
                isFullWidth
                isColor="primary"
                onClick={this.handleAddDay}
              > +
              </Button>
            </PanelBlock>
          </Panel>
        </Column>
        <Column isSize={8}>
          <Day
            day={selectedDay}
            editId={editPlanId}
            onAddPlan={this.handleAddPlan}
            onRemoveDay={this.handleRemoveDay}
            onRemovePlan={this.handleRemovePlan}
            onToggleEditPlan={this.handleToggleEditPlan}
            onUpdatePlan={this.handleUpdatePlan}
            plans={selectedPlans}
            tripSettings={tripSettings}
          />
        </Column>
        {/* <Column isSize={4}><FindPlace onSelect={this.handleSelectDay} /></Column> */}
      </Columns>
    );
  }

  private handleAddDay = () => {
    this.props.trip.addDay();
  }

  private handleAddPlan = () => {
    this.props.trip.addPlan(this.props.ui.selectedDay);
  }

  private handleRemoveDay = (day: string) => {
    this.props.trip.removeDay(day);
  }

  private handleRemovePlan = (id: string) => {
    this.props.trip.removePlan(id);
  }

  private handleToggleEditPlan = (id: string) => {
    this.props.ui.setEditPlan(id);
  }

  private handleSelectDay = (day: string) => {
    this.props.ui.setSelectDay(day);
  }

  private handleUpdatePlan = (id: string, name: string, value: any) => {
    this.props.trip.updatePlan(id, name, value);
  }

  private renderDays() {
    const { range } = this.props.trip;
    const { selectedDay } = this.props.ui;
    return range.map((day: string, index: number) => {
      return (
        <TripSelectableDay
          active={selectedDay === day}
          day={day}
          key={day}
          onSelect={this.handleSelectDay}
        >
          {index + 1}
        </TripSelectableDay>
      );
    });
  }
}

export default Trip;
