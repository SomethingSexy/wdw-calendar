import '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Control, Field, Input, Label } from 'bloomer';
import React, { PureComponent } from 'react';

interface IProps {
  open?: boolean;
  onToggle: () => void;
}

interface IState {
  collapsed: boolean;
}

/**
 *
 */
class SetttingsMenu extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      collapsed: !props.open || false // default false
    };
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState({ collapsed: !nextProps.open });
  }

  public render() {
    const { collapsed } = this.state;

    if (collapsed) {
      return (
        <div style={{ paddingLeft: '0.75rem', textAlign: 'center', paddingTop: '0.75rem' }}>
          <span onClick={this.handleOnToggle}>
            <FontAwesomeIcon icon="cogs" size="lg" />
          </span>
        </div>
      );
    }

    return (
      <div style={{ paddingLeft: '0.75rem', textAlign: 'center', paddingTop: '0.75rem' }}>
        <span onClick={this.handleOnToggle}>
          Settings
        </span>
        <Field>
          <Label>State Date</Label>
          <Control>
            <Input type="text" placeholder="Text Input" />
          </Control>
        </Field>
      </div>
    );
  }

  private handleOnToggle = () => {
    this.props.onToggle();
  }
}

export default SetttingsMenu;
