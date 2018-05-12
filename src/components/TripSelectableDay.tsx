import {
  PanelBlock
} from 'bloomer';
import React, { Component, ReactNode } from 'react';

interface IProps {
  active?: boolean;
  children?: ReactNode;
  day: string;
  onSelect: (id: string) => void;
}

class TripDay extends Component<IProps> {
  public render() {
    const { active, day, children } = this.props;
    return (
      <PanelBlock
        className="has-text-centered"
        key={day}
        isActive={active}
        onClick={this.handleSelect}
        style={{ cursor: 'pointer' }}
      >
        {children || day}
      </PanelBlock>
    );
  }

  private handleSelect = () => {
    this.props.onSelect(this.props.day);
  }
}

export default TripDay;
