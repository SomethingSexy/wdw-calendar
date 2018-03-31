import classnames from 'classnames';
import React, { ReactNode, StatelessComponent } from 'react';

interface IProps {
  children: ReactNode;
  isPosition?: 'top' | 'right' | 'bottom' | 'left';
  text: string;
}

const positions = {
  top: 'is-tooltip-top',
  right: 'is-tooltip-right',
  bottom: 'is-tooltip-bottom',
  left: 'is-tooltip-left'
};

const Tooltip: StatelessComponent<IProps> = ({ children, isPosition = 'top', text }) => {
  return (
    <div className={classnames('tooltip', positions[isPosition])} data-tooltip={text}>
      {children}
    </div>
  );
};

export default Tooltip;
