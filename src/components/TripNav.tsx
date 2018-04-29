import {
  Tab,
  TabLink,
  TabList,
  Tabs
} from 'bloomer';
import React, { StatelessComponent } from 'react';

interface IProps {
  active?: string;
}

const TripNav: StatelessComponent<IProps> = ({}) => {
  return (
    <Tabs>
      <TabList>
          <Tab>
              <TabLink>
                  Plans
              </TabLink>
          </Tab>
          <Tab isActive>
              <TabLink>
                  Calendar
              </TabLink>
          </Tab>
      </TabList>
    </Tabs>
  );
};

export default TripNav;
