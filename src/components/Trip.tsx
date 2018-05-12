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
}

interface IState {
  showEditActivity: boolean;
}

@inject('places')
@inject('plans')
@inject('trip')
@observer
class Trip extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.places.fetch();
  }

  public render() {
    const { places, trip } = this.props;
    const { isLoading, loaded } = places;
    if (isLoading || !loaded) {
      return <div>Loading...</div>;
    }

    const { selectedDay, plans } = trip;

    const selectedPlans = plans.list.filter((plan: IPlan) => plan.date === selectedDay);

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
          <Day day={selectedDay} onAddPlan={this.handleAddPlan} plans={selectedPlans} />
        </Column>
        {/* <Column isSize={4}><FindPlace onSelect={this.handleSelectDay} /></Column> */}
      </Columns>
    );
  }

  private handleAddDay = () => {
    this.props.trip.addDay();
  }

  private handleAddPlan = () => {
    this.props.trip.addPlan(this.props.trip.selectedDay);
  }

  private handleSelectDay = (day: string) => {
    this.props.trip.setDay(day);
  }

  private renderDays() {
    const { range, selectedDay } = this.props.trip;
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
