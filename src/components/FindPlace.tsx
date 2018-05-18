import '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Control,
  Input,
  PageControl,
  Pagination,
  Panel,
  PanelBlock,
  PanelHeading,
  PanelTab,
  PanelTabs
} from 'bloomer';
import { inject, observer } from 'mobx-react';
import React, { Component, ReactNode } from 'react';
import { normalizeEvent } from '../utils';
import PlaceItem from './PlaceItem';

interface IFilterOptions {
  className: string;
  children: ReactNode;
}

export interface IProps {
  onSelect: (id: string) => void;
  places?: any;
}

const filters = [{
  label: 'All',
  filter: 'all'
}, {
  icon: ['fab', 'fort-awesome'],
  filter: 'themePark'
}, {
  icon: 'utensils',
  filter: 'restaurant'
}, {
  icon: 'star',
  filter: 'attraction'
}];

const styles = {
  panelheading: { marginBottom: 0 }
};

@inject('places')
@observer
class FindPlace extends Component<IProps> {
  public render() {
    return (
      <Panel>
        <PanelHeading style={styles.panelheading}>Things to do...</PanelHeading>
        <PanelBlock>
          <Control hasIcons="left">
            <Input onChange={this.handleSearch} placeholder="Search..." />
            <span className="icon is-left is-small">
              <FontAwesomeIcon icon="search" />
            </span>
          </Control>
        </PanelBlock>
        <PanelTabs>
          {this.renderFilters()}
        </PanelTabs>
        {this.renderPlaces()}
        <PanelBlock>
          <Pagination>
            <PageControl onClick={this.handlePreviousPage}>Previous</PageControl>
            <PageControl isNext onClick={this.handleNextPage}>Next</PageControl>
          </Pagination>
        </PanelBlock>
      </Panel>
    );
  }

  private handleFilter = (type: string) => {
    this.props.places.filter(type);
  }

  private handleSearch = (event: any) => {
    const { value } = normalizeEvent(event);
    this.props.places.search(value);
  }

  private handleSelect = (id: string) => {
    this.props.onSelect(id);
  }

  private handleNextPage = () => {
    this.props.places.nextPage();
  }

  private handlePreviousPage = () => {
    this.props.places.previousPage();
  }

  private renderPlaces() {
    return this.props.places.page.map((place: any) => {
      return (
        <PanelBlock
          key={place.id}
          onClick={() => this.handleSelect(place.id)} // tslint:disable-line
          style={{ cursor: 'pointer' }}
        >
          <PlaceItem {...place} />
        </PanelBlock>
      );
    });
  }

  private renderFilters = () => {
    return filters.map((filter, index) => {
      return (
        <PanelTab
          isActive={this.props.places.selectedFilter === filter.filter}
          key={index}
          render={(options: IFilterOptions) => this.renderFilter(options, filter)} // tslint:disable-line jsx-no-lambda jsx-no-multiline-js max-line-length
        />
      );
    });
  }

  private renderFilter = (options: IFilterOptions, filter: any) => {
    // have to add font awesome here because the type definiton is not correct for allow
    // array or string
    return (
      <a
        className={options.className}
        onClick={() => this.handleFilter(filter.filter)} // tslint:disable-line jsx-no-lambda
      >
        {filter.icon ? <FontAwesomeIcon icon={filter.icon} size="2x" /> : filter.label}
      </a>
    );
  }
}

export default FindPlace;
