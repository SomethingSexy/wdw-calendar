import '@fortawesome/fontawesome-free-brands';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Content, Control, Field, Label } from 'bloomer';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import FindPlan from './FindPlan';
import NativeDate from './NativeDate';

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
            {!plan.planId && <FindPlan onSelect={this.handleSelectPlan} />}
            {plan.planId && <Content>{plan.planId}</Content>}
          </Control>
        </Field>
      </div>
    );
  }

  private handleChangePlan = () => {
    //
  }

  private handleSelectPlan = (id: string) => {
    this.props.plans.update({
      ...this.props.plan,
      planId: id
    });
  }
}

export default EditPlan;
