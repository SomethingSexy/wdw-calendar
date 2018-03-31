import '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Level, LevelItem, LevelLeft, LevelRight } from 'bloomer';
import React, { StatelessComponent } from 'react';
import PlanText from './PlanText';
import Tooltip from './Tooltip';

interface IProps {
  id: string;
  activity: {
    id: string;
    name: string;
    type: string;
  };
  timeRange: string;
  expanded: boolean;
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

const renderActivity = (activity: any) => {
  if (activity) {
    return <Tooltip isPosition="right" text={activity.name}>{getIcon(activity.type)}</Tooltip>;
  }
};

const Plan: StatelessComponent<IProps> = ({ activity, expanded, timeRange }) => {
  return (
    <>
    <Level style={{ marginBottom: '0px', paddingLeft: '5px', paddingRight: '5px' }}>
      <LevelLeft>
        <LevelItem>
          {renderActivity(activity)}
        </LevelItem>
      </LevelLeft>
      <LevelRight>
        <LevelItem>
          <Tooltip isPosition="left" text={timeRange}><FontAwesomeIcon icon="clock" /></Tooltip>
        </LevelItem>
      </LevelRight>
    </Level>
    {expanded && activity && <PlanText hasTextAlign="centered">{activity.name}</PlanText>}
    </>
  );
};

export default Plan;
