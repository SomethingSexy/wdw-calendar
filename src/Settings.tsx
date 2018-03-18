import '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Control, Field, Input, Label, Title } from 'bloomer';
import { omit } from 'lodash';
import * as moment from 'moment';
import React, { PureComponent } from 'react';

interface IProps {
  open?: boolean;
  onChangeSettings: (settings: {}) => void;
  onToggle: () => void;
  title?: string;
}

interface IState {
  collapsed: boolean;
  settings: {
    dateStart?: string;
    days?: string;
  };
  errors: {
    dateStart?: string;
    days?: string;
  };
}

const normalizeEvent = (event: any) => {
  const { name, value } = event.target;

  return { name, value };
};

/**
 *
 */
class SetttingsMenu extends PureComponent<IProps, IState> {
  private title: string;

  constructor(props: IProps) {
    super(props);

    this.title = props.title || 'Settings';
    this.state = {
      collapsed: !props.open || false, // default false
      // storing here to handle error handling
      settings: {},
      errors: {}
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
        <Title onClick={this.handleOnToggle}>
          {this.title}
        </Title>
        <Field>
          <Label>Start Date</Label>
          <Control>
            <Input
              isColor={this.state.errors.dateStart ? 'danger' : undefined}
              name="dateStart"
              onChange={this.handleChangeDate}
              type="date"
            />
          </Control>
        </Field>
        <Field>
          <Label>How Many Days?</Label>
          <Control>
            <Input
              isColor={this.state.errors.days ? 'danger' : undefined}
              max="14"
              min="0"
              name="days"
              onChange={this.handleChangeDays}
              type="number"
            />
          </Control>
        </Field>
        <Field isGrouped>
          <Control>
            <Button isColor="primary" onClick={this.handleSubmit}>Save</Button>
          </Control>
        </Field>
      </div>
    );
  }

  private setSetting(name: string, value: any) {
    this.setState({
      settings: {
        ...this.state.settings,
        [name]: value
      },
      errors: omit(this.state.errors, [name])
    });
  }

  private setError(name: string, error: string) {
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: error
      }
    });
  }

  private handleChangeDate = (event: any) => {
    const { name, value } = normalizeEvent(event);
    const date = moment(value, 'YYYY-MM-DD');

    if (!date.isValid()) {
      this.setError(name, 'Valid date is required.');
      return;
    }

    this.setSetting(name, date.format('MM-DD-YYYY'));
  }

  private handleChangeDays = (event: any) => {
    const { name, value } = normalizeEvent(event);
    const days = Number.parseInt(value);

    if (Number.isNaN(days)) {
      this.setError(name, 'Days is required.');
      return;
    }

    if (days <= 0 || days > 15) {
      this.setError(name, 'Days must be between 1 and 14.');
      return;
    }

    this.setSetting(name, days);
  }

  private handleSubmit = () => {
    if (!Object.keys(this.state.errors).length) {
      this.props.onChangeSettings(this.state.settings);
    }
  }

  private handleOnToggle = () => {
    this.props.onToggle();
  }
}

export default SetttingsMenu;
