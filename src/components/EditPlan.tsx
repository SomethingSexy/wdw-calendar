import '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Control, Field, Input, Label } from 'bloomer';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { normalizeEvent } from '../utils';
import FindPlace from './FindPlace';
import NativeDate from './NativeDate';
import Placeitem from './PlaceItem';

// TODO: get types here
export interface IProps {
  onClose: () => void;
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
    const { onClose, places, plan } = this.props;
    const show = this.state.showEditActivity;
    const { isLoading, loaded } = places;
    if (isLoading || !loaded) {
      return <div>Loading...</div>;
    }

    const place = plan.activity;

    return (
      <div>
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
              name="dateStart"
              onChange={this.handleChangeDate}
              value={this.props.plan.date}
            />
          </Control>
        </Field>
        <Field>
          <Label>
            Activity
            {place && this.renderEditActivityToggle()}
          </Label>
          <Control>
            {show && <FindPlace onSelect={this.handleSelectActivity} />}
            {!show && <Placeitem {...place} />}
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

  private handleChangeDate = ({}, value: string) => {
    this.props.plans.updatePlanDate(this.props.plan.id, value);
  }

  private handleChangeValue = (event: any) => {
    const { name, value } = normalizeEvent(event);
    this.props.plans.updatePlanField(this.props.plan.id, name, value);
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
