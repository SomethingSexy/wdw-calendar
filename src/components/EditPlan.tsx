import '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Control, Input, Panel, PanelBlock, PanelHeading } from 'bloomer';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

const getIcon = (type: string) => {
  if (type === 'themePark') {
    return 'fort-awesome';
  }

  if (type === 'restaurant') {
    return 'utensils';
  }

  return 'building';
};

// TODO: get types here
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

    if (this.props.places.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>{this.props.plan.id}</h2>
        <Panel>
          <PanelHeading>Things to do...</PanelHeading>
          <PanelBlock>
            <Control hasIcons="left">
              <Input isSize="small" placeholder="Search..." />
              <span className="icon is-left is-small">
                <FontAwesomeIcon icon="search" />
              </span>
            </Control>
        </PanelBlock>
          {this.renderPlaces()}
        </Panel>
      </div>
    );
  }

  private renderPlaces() {
    return this.props.places.places.map((place: any) => {
      return (
        <PanelBlock key={place.id}>
          <FontAwesomeIcon icon={getIcon(place.type)} />
          <span style={{ marginLeft: '5px' }}>{place.name}</span>
        </PanelBlock>
      );
    });
  }
}

export default EditPlan;
