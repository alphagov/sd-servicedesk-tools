import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

import ClientSearch from '../clients/ClientSearch';
import ClientDetails from '../clients/ClientDetails';
import ClientAssetCard from '../assetman/ClientAssetCard';

import { fetchAssetStatus, fetchAssetLocations } from '../../actions/assets';

class AssetManager extends Component {
  componentDidMount() {
    const { fetchAssetStatus, fetchAssetLocations } = this.props;
    fetchAssetStatus();
    fetchAssetLocations();
  }

  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          Asset Manager
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <ClientSearch />
            </Grid.Column>
            <Grid.Column width={8}>
              <ClientDetails />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <ClientAssetCard />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchAssetStatus,
  fetchAssetLocations
};

AssetManager = connect(null, mapDispatchToProps)(AssetManager);

export default AssetManager;
