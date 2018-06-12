import React, { Component } from 'react';

import { Header, Grid } from 'semantic-ui-react';

import AssetTools from './assetman/AssetTools';

class SDTools extends Component {
  render() {
    return (
      <div>
        <Header as="h1" textAlign="center">
          Service Desk Tools
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Assets
              </Header>
              <AssetTools />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default SDTools;
