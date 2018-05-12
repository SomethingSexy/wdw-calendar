import '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Control, Field, Label } from 'bloomer';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import FindPlace from '../FindPlace';
import NativeDate from '../NativeDate';
import Placeitem from '../PlaceItem';

// TODO: get types here
export interface IProps {
  plan: any;
  places?: any;
  plans?: any;
}

interface IState {
  showEditActivity: boolean;
}

@inject('plans')
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
    const { plan, places } = this.props;
    const show = this.state.showEditActivity;
    const { isLoading, loaded } = places;
    if (isLoading || !loaded) {
      return <div>Loading...</div>;
    }

    const place = plan.activity;

    return (
      <div>
        <Field>
          <Label>Date</Label>
          <Control>
            <NativeDate
              // isColor={this.state.errors.dateStart ? 'danger' : undefined}
              format="MM/DD/YYYY"
              name="dateStart"
              onChange={this.handleChangeDate}
              value={this.props.plan.date}
            />
          </Control>
        </Field>
        <Field>
          <Label>
            Plan
            {place && this.renderEditActivityToggle()}
          </Label>
          <Control>
            {show && <FindPlace onSelect={this.handleSelectActivity} />}
            {!show && <Placeitem {...place} />}
          </Control>
        </Field>
      </div>
    );
  }

  private handleChangeDate = ({}, value: string) => {
    this.props.plans.updatePlanDate(this.props.plan.id, value);
  }

  private toggleEditActivity = () => {
    this.setState({ showEditActivity: !this.state.showEditActivity });
  }

  private handleSelectActivity = (id: string) => {
    this.props.plans.updatePlanActivity(this.props.plan.id, id);
  }

  private renderEditActivityToggle() {
    return (
      <span onClick={this.toggleEditActivity} style={{ marginLeft: '5px', cursor: 'pointer' }}>
        <FontAwesomeIcon icon="pencil-alt" />
      </span>
    );
  }
}

export default EditPlan;
