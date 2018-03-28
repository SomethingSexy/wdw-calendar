import '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Control, Field, Input, Label, Select, Title } from 'bloomer';
import { omit } from 'lodash';
import * as moment from 'moment';
import React, { PureComponent } from 'react';
import NativeDate from './components/NativeDate';
import { normalizeEvent } from './utils';

interface IProps {
  dateStart?: string;
  days?: string;
  interval?: string;
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
    interval?: string;
  };
  errors: {
    dateStart?: string;
    days?: string;
    interval?: string;
  };
}

const intervals = ['15m', '30m', '60m'];

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
      settings: {
        dateStart: props.dateStart || '',
        days: props.days || '',
        interval: props.interval || '30m'
      },
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
            <NativeDate
              // isColor={this.state.errors.dateStart ? 'danger' : undefined}
              format="MM/DD/YYYY"
              name="dateStart"
              onChange={this.handleChangeDate}
              value={this.state.settings.dateStart}
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
              value={this.state.settings.days}
            />
          </Control>
        </Field>
        <Field>
          <Label>Interval</Label>
          <Control>
            <Select onChange={this.handleChangeInterval} value={this.state.settings.interval}>
              {this.renderIntervals()}
            </Select>
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
      }
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

  private removeError(name: string) {
    this.setState({
      errors: omit(this.state.errors, [name])
    });
  }

  private handleChangeDate = (name: string, value: string) => {
    const date = moment(value, 'YYYY-MM-DD');

    if (!date.isValid()) {
      this.setError(name, 'Valid date is required.');
    } else {
      this.removeError(name);
    }

    this.setSetting(name, date.format('MM-DD-YYYY'));
  }

  private handleChangeDays = (event: any) => {
    const { name, value } = normalizeEvent(event);
    const days = Number.parseInt(value);

    if (Number.isNaN(days) || (days <= 0 || days > 15)) {
      this.setError(name, 'Days is required and must be between 1 and 14.');
    } else {
      this.removeError(name);
    }

    this.setSetting(name, days || '');
  }

  private handleChangeInterval = (event: any) => {
    const { name, value } = normalizeEvent(event);
    this.setSetting(name, value);
  }

  private handleSubmit = () => {
    if (!Object.keys(this.state.errors).length) {
      this.props.onChangeSettings(this.state.settings);
    }
  }

  private handleOnToggle = () => {
    this.props.onToggle();
  }

  private renderIntervals() {
    return intervals.map(interval => <option key={interval} value={interval}>{interval}</option>);
  }
}

export default SetttingsMenu;
