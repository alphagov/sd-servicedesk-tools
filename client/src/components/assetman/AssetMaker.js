import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';

import { connect } from 'react-redux';

import { fetchAssetStatus, fetchAssetLocations } from '../../actions/assets';

class AssetMaker extends Component {
  componentDidMount() {
    const { fetchAssetStatus, fetchAssetLocations } = this.props;
    fetchAssetStatus();
    fetchAssetLocations();
  }

  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          Asset Maker
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column />
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

AssetMaker = connect(null, mapDispatchToProps)(AssetMaker);

export default AssetMaker;
