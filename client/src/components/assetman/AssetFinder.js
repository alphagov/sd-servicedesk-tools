import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';

import AssetSearch from './AssetSearch';
import AssetDetails from './AssetDetails';

class AssetFinder extends Component {
  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          Asset Finder
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <AssetSearch />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <AssetDetails />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default AssetFinder;
