import {
  Button,
  Column,
  Columns,
  Container,
  Delete,
  Hero,
  HeroBody,
  HeroHeader,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardBody,
  ModalCardFooter,
  ModalCardHeader,
  ModalCardTitle,
  Title
} from 'bloomer';
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
        <HeroBody style={{ paddingLeft: 0 }}>
          <Container style={{ margin: 0 }}>
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
              days={this.state.settings.days}
              interval="30m"
              plans={this.state.plans}
              renderModal={this.renderModal}
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

  private renderModal = ({}, isOpen: boolean) => {
    return (
      <Modal isActive={isOpen}>
        <ModalBackground />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>ModalCard Title</ModalCardTitle>
            <Delete />
          </ModalCardHeader>
          <ModalCardBody>
              {/* Your Content  */}
          </ModalCardBody>
          <ModalCardFooter>
            <Button isColor="success">Save</Button>
            <Button isColor="warning">Cancel</Button>
          </ModalCardFooter>
        </ModalCard>
      </Modal>
    );
  }

  private renderPlanEdit = () => {
    return <div>balls</div>;
  }
}

export default Application;
