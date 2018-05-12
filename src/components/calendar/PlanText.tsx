import { withHelpersModifiers } from 'bloomer';
import React, { ReactNode, StatelessComponent } from 'react';

interface IProps {
  children: ReactNode;
  hasTextAlign: string;
}

const PlanText: StatelessComponent<IProps> = ({ children }) => {
  // TODO: I had this as a const but it was bitching about overflow: hidden
  return (
    <p
      style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px' }}
    >
      {children}
    </p>
  );
};

export default withHelpersModifiers(PlanText);
