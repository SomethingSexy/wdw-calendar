import { Panel, PanelBlock } from 'bloomer';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

export interface IProps {
  plan: any;
  places?: any;
}

@inject('places')
@observer
class EditPlan extends Component<IProps> {

  public componentDidMount() {
    this.props.places.fetch();
  }

  public render() {
    console.log(toJS(this.props.places.places)); // tslint:disable-line
    return (
      <div>
        <h2>{this.props.plan.id}</h2>
        <Panel>
          <PanelBlock>
            Balls
          </PanelBlock>
        </Panel>
      </div>
    );
  }
}

export default EditPlan;
