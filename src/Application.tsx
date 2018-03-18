import { Column, Columns, Container, Hero, HeroBody, HeroHeader, Title } from 'bloomer';
import React, { Fragment, PureComponent } from 'react';
import { Planner } from 'react-planner';
import SetttingsMenu from './Settings';

// const dateStart = '02/01/2018';

export interface IPlannerState {
  menuOpen: boolean;
  plans: any;
  settings: { [key: string]: string; };
}

class Application extends PureComponent<{}, IPlannerState> {
  constructor(props: any) {
    super(props);
    // TODO: Move settings out of here and into mobx
    this.state = { plans: [], menuOpen: false, settings: {} };
  }

  public render() {
    return (
      <Hero isFullHeight>
        <HeroHeader>
          <Container>
            <Title tag="h1">WDW Calendar</Title>
          </Container>
        </HeroHeader>
        <HeroBody>
          <Container>
            {this.canRenderPlanner() && this.renderPlanner()}
            {!this.canRenderPlanner() && this.renderStart()}
          </Container>
        </HeroBody>
      </Hero>
    );
  }

  private canRenderPlanner() {
    if (this.state.settings.dateStart && this.state.settings.days) {
      return true;
    }

    return false;
  }

  /**
   * Handles rendering a view if not enough data is available.
   */
  private renderStart() {
    return (
      <Columns>
        <Column isSize="1/2" isOffset="1/4">
          <SetttingsMenu
            onChangeSettings={this.handleChangeSettings}
            onToggle={this.handleToggleMenu}
            open
            title="Getting Started"
          />
        </Column>
      </Columns>
    );
  }

  private renderPlanner() {
    const { menuOpen } = this.state;
    const leftSize = menuOpen ? 2 : 1;
    const rightSize = menuOpen ? 10 : 11;

    return (
      <Fragment>
        <Columns>
          <Column isSize={leftSize} style={{ borderRight: '1px solid lightgray' }}>
            <SetttingsMenu
              {...this.state.settings}
              onChangeSettings={this.handleChangeSettings}
              onToggle={this.handleToggleMenu}
              open={this.state.menuOpen}
            />
          </Column>
          <Column isSize={rightSize}>
            <p>Double click a plan to edit.</p>
            <Planner
              dateStart={this.state.settings.dateStart}
              days={7}
              interval="30m"
              plans={this.state.plans}
              renderPlanEdit={this.renderPlanEdit}
              onUpdatePlans={this.handleUpdatePlans}
            />
          </Column>
        </Columns>
      </Fragment>
    );
  }

  private handleChangeSettings = (settings: {}) => {
    this.setState({ settings });
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
