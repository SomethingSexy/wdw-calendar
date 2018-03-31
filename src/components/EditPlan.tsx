import '@fortawesome/fontawesome-free-brands';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Control, Field, Label } from 'bloomer';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import FindPlace from './FindPlace';
import NativeDate from './NativeDate';
import Placeitem from './PlaceItem';

// TODO: get types here
export interface IProps {
  plan: any;
  places?: any;
  plans?: any;
}

@inject('plans')
@inject('places')
@observer
class EditPlan extends Component<IProps> {
  public componentDidMount() {
    this.props.places.fetch();
  }

  public render() {
    const { plan, places } = this.props;
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
              onChange={this.handleChangePlan}
              value={this.props.plan.date}
            />
          </Control>
        </Field>
        <Field>
          <Label>Plan</Label>
          <Control>
            {!place && <FindPlace onSelect={this.handleSelectPlan} />}
            {place && <Placeitem {...place} />}
          </Control>
        </Field>
      </div>
    );
  }

  private handleChangePlan = () => {
    //
  }

  private handleSelectPlan = (id: string) => {
    this.props.plans.updatePlanActivity(this.props.plan.id, id);
  }
}

export default EditPlan;
