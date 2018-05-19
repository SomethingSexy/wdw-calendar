import '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Control, Field, Input, Label } from 'bloomer';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { IPlan, OnUpdatePlan, PlanType } from '../types';
import { normalizeEvent } from '../utils';
import FindPlace from './FindPlace';
import NativeDate from './NativeDate';
import Placeitem from './PlaceItem';

// TODO: get types here
export interface IProps {
  onClose: () => void;
  plan: IPlan;
  places?: any;
  onUpdatePlan: OnUpdatePlan;
  tripSettings: {
    min: string;
    max: string;
  };
}

interface IState {
  showEditActivity: boolean;
}

const styles = {
  buttons: {
    float: 'right' as 'right'
  }
};

const types = [{
  icon: 'infinity',
  type: PlanType.Common,
  title: 'Custom Activity'
}, {
  icon: 'bed',
  type: PlanType.Hotel,
  title: 'Hotel'
}, {
  icon: 'utensils',
  type: PlanType.Dining,
  title: 'Dining'
}, {
  icon: 'star',
  type: PlanType.Attraction,
  title: 'Attraction'
}, {
  icon: ['fab', 'fort-awesome'],
  type: PlanType.Park,
  title: 'Park'
}];

@inject('places')
@observer
class EditPlan extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showEditActivity: !props.plan.activity
    };
  }

  public componentDidMount() {
    this.props.places.fetch();
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState({ showEditActivity: !nextProps.plan.activity });
  }

  public render() {
    const { onClose, places, plan, tripSettings } = this.props;
    const show = this.state.showEditActivity;
    const { isLoading, loaded } = places;
    if (isLoading || !loaded) {
      return <div>Loading...</div>;
    }

    const { activity } = plan;

    return (
      <div>
        <span style={styles.buttons}>
          <Button onClick={onClose}>
            <FontAwesomeIcon className="fa-hover" icon="times" />
          </Button>
        </span>
        {this.renderTypes()}
        <Field>
          <Label>Title</Label>
          <Control>
            <Input
              // isColor={this.state.errors.title ? 'danger' : undefined}
              name="title"
              onChange={this.handleChangeValue}
              type="text"
              value={this.props.plan.title || ''}
            />
          </Control>
        </Field>
        <Field>
          <Label>Notes</Label>
          <Control>
            <Input
              // isColor={this.state.errors.notes ? 'danger' : undefined}
              name="notes"
              onChange={this.handleChangeValue}
              type="text"
              value={this.props.plan.notes || ''}
            />
          </Control>
        </Field>
        <Field>
          <Label>Date</Label>
          <Control>
            <NativeDate
              // isColor={this.state.errors.dateStart ? 'danger' : undefined}
              format="MM/DD/YYYY"
              max={tripSettings.max}
              min={tripSettings.min}
              name="date"
              onChange={this.handleChangeDate}
              value={this.props.plan.date}
            />
          </Control>
        </Field>
        <Field>
          <Label>
            Activity
            {activity && this.renderEditActivityToggle()}
          </Label>
          <Control>
            {show && <FindPlace onSelect={this.handleSelectActivity} />}
            {!show && <Placeitem {...activity} />}
          </Control>
        </Field>
        <Field isGrouped>
          <Control>
            <Button isLink onClick={onClose}>
              <FontAwesomeIcon icon="long-arrow-alt-left" />
            </Button>
          </Control>
        </Field>
      </div>
    );
  }

  private handleChangeDate = (name: string, value: string) => {
    this.props.onUpdatePlan(this.props.plan.id, name, value);
  }

  private handleChangeValue = (event: any) => {
    const { name, value } = normalizeEvent(event);
    this.props.onUpdatePlan(this.props.plan.id, name, value);
  }

  private handleChangeType = (type: PlanType) => {
    this.props.onUpdatePlan(this.props.plan.id, 'type', type);
  }

  private toggleEditActivity = () => {
    this.setState({ showEditActivity: !this.state.showEditActivity });
  }

  private handleSelectActivity = (id: string) => {
    this.props.onUpdatePlan(this.props.plan.id, 'activity', id);
  }

  private renderEditActivityToggle() {
    return (
      <span onClick={this.toggleEditActivity} style={{ marginLeft: '5px', cursor: 'pointer' }}>
        <FontAwesomeIcon icon="pencil-alt" />
      </span>
    );
  }

  private renderTypes() {
    const { type } = this.props.plan;
    const renderedTypes = types.map((t: any) => {
      return (
        <Button
          key={t.type}
          isActive={type === t.type}
          onClick={() => this.handleChangeType(t.type)} // tslint:disable-line jsx-no-lambda max-line-length
          title={t.title}
        >
          <FontAwesomeIcon className="fa-hover" icon={t.icon} />
        </Button>
      );
    });

    return <div className="buttons has-addons is-centered">{renderedTypes}</div>;
  }
}

export default EditPlan;
