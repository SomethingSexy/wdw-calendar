import {
  Tab,
  TabLink,
  TabList,
  Tabs
} from 'bloomer';
import React, { StatelessComponent } from 'react';

type OnSelect = (id: string) => void;

interface IProps {
  active?: string;
  onSelect: OnSelect;
}

const renderLink = (label: string, onClick: OnSelect) => {
  const func = onClick.bind(undefined, label.toLocaleLowerCase());
  return () => <a onClick={func}>{label}</a>;
};

const TripNav: StatelessComponent<IProps> = ({ active, onSelect }) => {
  return (
    <Tabs>
      <TabList>
        <Tab isActive={active === 'plans'}>
          <TabLink render={renderLink('Plans', onSelect)} />
        </Tab>
        <Tab isActive={active === 'calendar'}>
          <TabLink render={renderLink('Calendar', onSelect)} />
        </Tab>
      </TabList>
    </Tabs>
  );
};

export default TripNav;
