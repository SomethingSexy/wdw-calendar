import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Planner from 'react-planner';
import uuid from 'uuid';

const plans = [
  { id: uuid.v4(), day: 1, time: 0, label: 'Fun' },
  { id: uuid.v4(), day: 2, time: 0, label: 'Fun' },
  { id: uuid.v4(), day: 3, time: 0, label: 'Fun' }
];

class App extends PureComponent {
  public render() {
    return (
      <div>
        <h1>WDW Calendar</h1>
        <p>Double click a plan to edit.</p>
        <Planner days={7} interval="30m" plans={plans} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />
, document.getElementById('app'));
