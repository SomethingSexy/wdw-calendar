import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Title,
} from 'bloomer';
import React, { Component } from 'react';
import { IPlan, OnUpdatePlan } from '../types';
import Plan from './Plan';

interface IProps {
  day: string;
  editId: string;
  onAddPlan: () => void;
  onToggleEditPlan: (id: string) => void;
  onUpdatePlan: OnUpdatePlan;
  plans: IPlan[];
  tripSettings: {
    min: string;
    max: string;
  };
}

const dayStyle = {
  // width: 500px;
  border: '1px  #CCC solid',
  height: '100%',
  boxShadow: 'inset 0px 0px 8px 1px rgba(204,204,204,0.75)',
  padding: '20px'
};

class Day extends Component<IProps> {
  public render() {
    const { day } = this.props;
    return (
      <>
        <Title isSize={4}>
        {day}
        <span style={{ float: 'right' }}>
          <Button isOutlined isColor="primary" onClick={this.props.onAddPlan}>
            <FontAwesomeIcon className="fa-hover" icon="plus-square" />
          </Button>
        </span>
        </Title>
        <div className="day" style={dayStyle}>
          {this.renderPlans()}
        </div>
      </>
    );
  }

  private renderPlans() {
    const { editId, onToggleEditPlan, onUpdatePlan, plans, tripSettings } = this.props;
    return plans.map(plan => (
      <Plan
        key={plan.id}
        edit={editId === plan.id}
        onToggleEditPlan={onToggleEditPlan}
        onUpdatePlan={onUpdatePlan}
        plan={plan}
        tripSettings={tripSettings}
      />
    ));
  }
}

export default Day;
