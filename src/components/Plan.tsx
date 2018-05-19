import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  CardContent,
  Content,
  Media,
  MediaContent,
  MediaLeft,
  // Select
  // Subtitle,
  Title,
} from 'bloomer';
import * as moment from 'moment';
import React, { Component } from 'react';
import { IPlan, OnRemovePlan, OnUpdatePlan, PlanType } from '../types';
import EditPlan from './EditPlan';

interface IProps {
  edit: boolean;
  onRemovePlan: OnRemovePlan;
  onToggleEditPlan: (id: string) => void;
  onUpdatePlan: OnUpdatePlan;
  plan: IPlan;
  tripSettings: {
    min: string;
    max: string;
  };
}

// interface IState {
//   edit: boolean;
//   form: {
//     title?: string;
//     notes?: string;
//   };
//   errors: {
//     title?: string;
//     notes?: string;
//   };
// }

const styles = {
  button: {
    marginRight: '10px'
  },
  card: {
    marginBottom: '10px',
  },
  overlayStyle: {
    display: 'none',
    width: '100%',
    height: '50%',
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#00d1b2',
    opacity: 0.75,
    padding: '20px',
    textAlign: 'center' as 'center'
  },
  plan: {
    position: 'relative' as 'relative'
  }
};

const types = {
  [PlanType.Common]: 'infinity',
  [PlanType.Hotel]: 'bed',
  [PlanType.Dining]: 'utensils',
  [PlanType.Attraction]: 'star',
  [PlanType.Park]: ['fab', 'fort-awesome'],
};

class Plan extends Component<IProps> {
  public render() {
    const { edit } = this.props;
    return (
      <div className="plan" style={styles.plan}>
        {edit && this.renderEdit()}
        {!edit && this.renderView()}
        {!edit && this.renderOverlay()}
      </div>
    );
  }

  private handleRemovePlan = () => {
    const { onRemovePlan, plan } = this.props;
    onRemovePlan(plan.id);
  }

  private handleToggleEdit = () => {
    this.props.onToggleEditPlan(this.props.plan.id);
  }

  // private setFormValue(name: string, value: any) {
  //   this.setState({
  //     form: {
  //       ...this.state.form,
  //       [name]: value
  //     }
  //   });
  // }

  // private setError(name: string, error: string) {
  //   this.setState({
  //     errors: {
  //       ...this.state.errors,
  //       [name]: error
  //     }
  //   });
  // }

  // private removeError(name: string) {
  //   this.setState({
  //     errors: omit(this.state.errors, [name])
  //   });
  // }

  private renderEdit() {
    const { plan, onUpdatePlan, tripSettings } = this.props;
    return (
      <Card style={styles.card}>
        <CardContent>
          <Content>
            <EditPlan
              onClose={this.handleToggleEdit}
              onUpdatePlan={onUpdatePlan}
              plan={plan}
              tripSettings={tripSettings}
            />
          </Content>
        </CardContent>
      </Card>
    );
  }

  private renderOverlay() {
    return (
      <div className="overlay" style={styles.overlayStyle}>
        <Button style={styles.button} onClick={this.handleToggleEdit}>Edit</Button>
        <Button onClick={this.handleRemovePlan}>Remove</Button>
      </div>
    );
  }

  private renderView() {
    const { plan } = this.props;
    const { date, title, type } = plan;
    const displayDate = moment(date, 'MM/DD/YYYY').format('dddd, MMMM Do YYYY');
    const icon: any = types[type];
    return (
      <Card style={styles.card}>
        <CardContent>
          <Media>
            <MediaLeft>
              <FontAwesomeIcon icon={icon} />
            </MediaLeft>
            <MediaContent>
              <Title isSize={4}>{title || 'New Activity!'}</Title>
              {/* <Subtitle isSize={6}>@John Wick</Subtitle> */}
            </MediaContent>
          </Media>
          <Content>
            Pick something to do for this time!
            <br/>
            <small>{displayDate}</small>
            {/* <small>11:09 PM - 30 October 2014</small> */}
          </Content>
        </CardContent>
      </Card>
    );
  }
}

export default Plan;
