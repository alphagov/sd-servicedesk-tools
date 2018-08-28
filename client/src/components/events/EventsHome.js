import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

import WCHEvents from './WCHEvents';
import ExternalEvents from './ExternalEvents';

const EventsHome = () => {
  return (
    <div>
      <Header as="h2" textAlign="center">
        Events Home
      </Header>
      <Grid columns={2}>
        <Grid.Column>
          <WCHEvents />
        </Grid.Column>
        <Grid.Column>
          <ExternalEvents />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default EventsHome;
