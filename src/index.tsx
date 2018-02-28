import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Planner from 'react-planner';
// import uuid from 'uuid';

// const plans = [
//   { id: uuid.v4(), date: '02/01/2018', day: 0, time: 0, label: 'Fun' },
//   { id: uuid.v4(), date: '02/02/2018', day: 1, time: 0, label: 'Fun' },
//   { id: uuid.v4(), date: '02/03/2018', day: 2, time: 0, label: 'Fun' }
// ];

const dateStart = '02/01/2018';
class App extends PureComponent {
  public render() {
    return (
      <div>
        <h1>WDW Calendar</h1>
        <p>Double click a plan to edit.</p>
        <Planner days={7} interval="30m" plans={[]} dateStart={dateStart} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />
, document.getElementById('app'));
