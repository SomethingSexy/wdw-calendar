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
  onRemoveDay: (id: string) => void;
  onRemovePlan: (id: string) => void;
  onToggleEditPlan: (id: string) => void;
  onUpdatePlan: OnUpdatePlan;
  plans: IPlan[];
  tripSettings: {
    min: string;
    max: string;
  };
}

const styles = {
  day: {
    // width: 500px;
    border: '1px  #CCC solid',
    height: '100%',
    boxShadow: 'inset 0px 0px 8px 1px rgba(204,204,204,0.75)',
    padding: '20px'
  },
  buttons: {
    float: 'right' as 'right'
  },
  button: {
    marginRight: '15px'
  },
  noPlans: {
    textAlign: 'center' as 'center'
  }
};

class Day extends Component<IProps> {
  public render() {
    const { day, plans } = this.props;
    return (
      <>
        <Title isSize={4}>
        {day}
        <span style={styles.buttons}>
          <Button isOutlined isColor="primary" onClick={this.props.onAddPlan} style={styles.button}>
            <FontAwesomeIcon className="fa-hover" icon="plus-square" />
          </Button>
          <Button
            isOutlined
            isColor="danger"
            onClick={this.handleRemoveDay}
            style={styles.button}
          >
            <FontAwesomeIcon className="fa-hover" icon="trash" />
          </Button>
        </span>
        </Title>
        <div className="day" style={styles.day}>
          {plans.length > 0 && this.renderPlans()}
          {plans.length === 0 && this.renderNoPlans()}
        </div>
      </>
    );
  }

  private handleRemoveDay = () => {
    const { onRemoveDay, day } = this.props;
    onRemoveDay(day);
  }

  private renderPlans() {
    const {
      editId,
      onRemovePlan,
      onToggleEditPlan,
      onUpdatePlan,
      plans,
      tripSettings
    } = this.props;

    return plans.map(plan => (
      <Plan
        key={plan.id}
        edit={editId === plan.id}
        onRemovePlan={onRemovePlan}
        onToggleEditPlan={onToggleEditPlan}
        onUpdatePlan={onUpdatePlan}
        plan={plan}
        tripSettings={tripSettings}
      />
    ));
  }

  private renderNoPlans() {
    return (
      <p style={styles.noPlans}>
        <span>Click the </span>
         <FontAwesomeIcon className="fa-hover" icon="plus-square" />
         <span> to add plans for this day!</span>
      </p>
    );
  }
}

export default Day;
