import '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Level, LevelItem, LevelLeft, LevelRight, Tag } from 'bloomer';
import React, { StatelessComponent } from 'react';

interface IProps {
  location: {
    name: string;
  };
  name: string;
  type: string;
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

const PlaceItem: StatelessComponent<IProps> = ({ location, name, type }) => {

  return (
    <Level style={{ width: '100%' }}>
      <LevelLeft>
        <LevelItem>
          {getIcon(type)}
          <span style={{ marginLeft: '5px' }}>{name}</span>
        </LevelItem>
      </LevelLeft>
      <LevelRight>
        <LevelItem>
          {location && <Tag>{location.name}</Tag>}
        </LevelItem>
      </LevelRight>
    </Level>
  );
};

export default PlaceItem;
