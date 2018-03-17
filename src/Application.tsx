import { Column, Columns, Hero, Title } from 'bloomer';
import React, { PureComponent } from 'react';
import { Planner } from 'react-planner';
import SetttingsMenu from './Menu';

const dateStart = '02/01/2018';

export interface IPlannerState {
  menuOpen: boolean;
  plans: any;
}

class Application extends PureComponent<{}, IPlannerState> {
  constructor(props: any) {
    super(props);
    this.state = { plans: [], menuOpen: false };
  }

  public render() {
    const { menuOpen } = this.state;
    const leftSize = menuOpen ? 2 : 1;
    const rightSize = menuOpen ? 10 : 11;

    return (
      <Hero>
        <Columns>
          <Column isSize={leftSize} style={{ borderRight: '1px solid lightgray' }}>
            <SetttingsMenu onToggle={this.handleToggleMenu} open={this.state.menuOpen} />
          </Column>
          <Column isSize={rightSize}>
            <Title tag="h1">WDW Calendar</Title>
            <p>Double click a plan to edit.</p>
            <Planner
              dateStart={dateStart}
              days={7}
              interval="30m"
              plans={this.state.plans}
              renderPlanEdit={this.renderPlanEdit}
              onUpdatePlans={this.handleUpdatePlans}
            />
          </Column>
        </Columns>
      </Hero>
    );
  }

  private handleToggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  private handleUpdatePlans = (plans: any) => {
    this.setState({ plans });
  }

  private renderPlanEdit = () => {
    return <div>balls</div>;
  }
}

export default Application;
