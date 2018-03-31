import '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Level, LevelItem, LevelLeft, LevelRight, Tag } from 'bloomer';
import React, { StatelessComponent } from 'react';

interface IProps {
  id: string;
  activity: {
    id: string;
    type: string;
  };
  timeRange: string;
}

const getIcon = (type: string) => {
  if (type === 'themePark') {
    return <FontAwesomeIcon icon={['fab', 'fort-awesome']} />;
  }

  if (type === 'restaurant') {
    return <FontAwesomeIcon icon="utensils" />;
  }

  if (type === 'attraction') {
    return <FontAwesomeIcon icon="star" />;
  }

  return <FontAwesomeIcon icon="building" />;
};

const Plan: StatelessComponent<IProps> = ({ activity, timeRange }) => {

  return (
    <>
      <p>{timeRange}</p>
      <p>{activity && getIcon(activity.type)}</p>
    </>
  );
};

export default Plan;
