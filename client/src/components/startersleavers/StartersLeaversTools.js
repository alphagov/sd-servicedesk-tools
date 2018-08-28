import React from 'react';
import { Header, Grid } from 'semantic-ui-react';

import NewStarterTools from './NewStarterTools';
import ToolsMenu from '../ToolsMenu';

const StartersLeaversTooLs = () => {
  return (
    <div>
      <Header as="h1" textAlign="center">
        Starts &amp; Leavers
      </Header>
      <ToolsMenu />
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              New Starts
            </Header>
            <NewStarterTools />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Leavers
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default StartersLeaversTooLs;
