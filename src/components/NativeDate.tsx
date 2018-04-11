import * as moment from 'moment';
import React, { PureComponent } from 'react';

const NATIVE_DATE_FORMAT = 'YYYY-MM-DD';

interface IProps {
  name: string;
  disabled?: boolean;
  format: string;
  max?: string;
  min?: string;
  value?: string;
  onChange: (name: string, value: string, event: any) => void;
}

class NativeDate extends PureComponent<IProps> {
  private input: HTMLInputElement | null;

  constructor(props: IProps) {
    super(props);
    this.input = null;
  }

  public componentDidMount() {
    this.setNativeDate();
  }

  public componentDidUpdate() {
    this.setNativeDate();
  }

  public render() {
    const {
      name,
      disabled,
      format,
      max,
      min
    } = this.props;

    const maxValue = moment(max, format || NATIVE_DATE_FORMAT, true);
    const minValue = moment(min, format || NATIVE_DATE_FORMAT, true);
    const additionalProps: any = {};

    if (maxValue.isValid()) {
      additionalProps.max = maxValue.format(NATIVE_DATE_FORMAT);
    }
    if (minValue.isValid()) {
      additionalProps.min = minValue.format(NATIVE_DATE_FORMAT);
    }

    return (
      <input
        className="input"
        disabled={disabled}
        name={name}
        ref={ref => { this.input = ref; }}
        type="date"
        onChange={this.handleOnChange}
        {...additionalProps}
      />
    );
  }

  private setNativeDate = () => {
    let { value } = this.props;
    const newDate = moment(value, this.props.format || NATIVE_DATE_FORMAT);
    value = newDate.isValid() ? newDate.format(NATIVE_DATE_FORMAT) : '';

    if (this.input) {
      this.input.value = value;
    }
  }

  private handleOnChange = (event: any) => {
    const { format, onChange, name } = this.props;
    if (onChange) {
      onChange(name, moment(event.target.value).format(format), event);
    }
  }
}

export default NativeDate;
