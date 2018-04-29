import {
  Button,
  Column,
  Columns,
  Container,
  Hero,
  HeroBody,
  HeroHeader
} from 'bloomer';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Calendar } from 'react-planner';
import EditPlan from './components/EditPlan';
import Modal from './components/Modal';
import Plan from './components/Plan';
import SetttingsMenu from './components/Settings';
import TopNav from './components/TopNav';

const helpText = `Double click to add a plan.
  Single click a plan to select it.
  Use left, down, up, and right to move the selected plan.
  Use delete or backspace to remove.
  Drag and drop to move plans between dates and time.`;

export interface IState {
  menuOpen: boolean;
}

export interface IProps {
  plans?: any;
  trip?: any;
}

@inject('plans')
@inject('trip')
@observer
class Application extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { menuOpen: false };
  }

  public render() {
    const { trip } = this.props;
    const { menuOpen } = this.state;
    return (
      <Fragment>
        <Menu isOpen={menuOpen} onStateChange={this.handleSetMenu}>
          <SetttingsMenu
            dateStart={trip.dateStart}
            days={trip.days}
            description="Existing plans will shift based on changes in settings."
            interval={trip.interval}
            onChangeSettings={this.handleUpdateSettings}
            onToggle={this.handleToggleMenu}
          />
        </Menu>
        <Hero isFullHeight>
          <HeroHeader style={{ boxShadow: '0 2px 3px rgba(10,10,10,.1)' }}>
            <TopNav
              isSettings={this.canRenderPlanner()}
              onToggleSettingsMenu={this.handleToggleMenu}
            />
          </HeroHeader>
          <HeroBody style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Container>
              {this.canRenderPlanner() && this.renderPlanner()}
              {!this.canRenderPlanner() && this.renderStart()}
            </Container>
          </HeroBody>
        </Hero>
      </Fragment>
    );
  }

  private canRenderPlanner() {
    if (this.props.trip.dateStart && this.props.trip.days) {
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
            onChangeSettings={this.handleInitialSettings}
            onToggle={this.handleToggleMenu}
            title="Getting Started"
          />
        </Column>
      </Columns>
    );
  }

  private renderPlanner() {
    const { plans, trip } = this.props;
    const rightSize = 12;
    const list = toJS(plans.list);
    return (
      <Fragment>
        <Columns>
          <Column isSize={rightSize}>
            <Calendar
              dateStart={trip.dateStart}
              days={trip.days}
              defaultPlanInterval={1}
              interval={trip.interval}
              plans={list}
              renderModal={this.renderModal}
              renderPlan={this.renderPlan}
              renderPlanEdit={this.renderPlanEdit}
              onUpdatePlans={this.handleUpdatePlans}
            />
            <p><i>{helpText}</i></p>
          </Column>
        </Columns>
      </Fragment>
    );
  }

  private handleInitialSettings = (settings: {}) => {
    this.props.trip.set(settings);
  }

  private handleUpdateSettings = (settings: {}) => {
    this.props.trip.update(settings);
    this.handleToggleMenu();
  }

  private handleToggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  private handleSetMenu = (state: any) => {
    this.setState({ menuOpen: state.isOpen });
  }

  private handleUpdatePlans = (plans: any) => {
    this.props.plans.updateAll(plans);
  }

  private renderModal = (plan: {}, options: any, isOpen: boolean) => {
    const { renderPlanEdit, onClose } = options;
    const footer = <Button isColor="warning" onClick={onClose}>Delete</Button>;
    return (
      <Modal footer={footer} isOpen={isOpen} onClose={onClose}>
        {renderPlanEdit(plan)}
      </Modal>
    );
  }

  private renderPlan = (plan: any, options: any) => {
    return <Plan {...plan} {...options} />;
  }

  private renderPlanEdit = (plan: any) => {
    return <EditPlan plan={plan} />;
  }
}

export default Application;
