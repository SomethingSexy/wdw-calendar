import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Planner } from 'react-planner';
import './test.css';
// import uuid from 'uuid';

// const plans = [
//   { id: uuid.v4(), date: '02/01/2018', day: 0, time: 0, label: 'Fun' },
//   { id: uuid.v4(), date: '02/02/2018', day: 1, time: 0, label: 'Fun' },
//   { id: uuid.v4(), date: '02/03/2018', day: 2, time: 0, label: 'Fun' }
// ];

const dateStart = '02/01/2018';

export interface IPlannerState {
  plans: any;
}

class App extends PureComponent<{}, IPlannerState> {
  constructor(props: any) {
    super(props);
    this.state = { plans: [] };
  }
  public render() {
    return (
      <div>
        <h1>WDW Calendar</h1>
        <p>Double click a plan to edit.</p>
        <Planner
          days={7}
          interval="30m"
          plans={this.state.plans}
          dateStart={dateStart}
          onUpdatePlans={this.handleUpdatePlans}
        />
      </div>
    );
  }

  private handleUpdatePlans = (plans: any) => {
    this.setState({ plans });
  }
}

ReactDOM.render(
  <App />
, document.getElementById('app'));
