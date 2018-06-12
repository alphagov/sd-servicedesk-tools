import React, { Component } from 'react';
import { Grid, Header, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
  fetchAssetStatus,
  fetchAssetLocations,
  fetchAssetRooms
} from '../../actions/assets';

import AssetDetailsCard from './AssetDetailsCard';
import AssetClients from './AssetClients';
import AssetDetailsStatus from './AssetDetailsStatus';
import AssetDetailsLocations from './AssetDetailsLocations';
import AssetDetailsReservable from './AssetDetailsReservable';
// import AssetDetailsRooms from './AssetDetailsRooms';

class AssetDetails extends Component {
  componentDidMount() {
    const {
      fetchAssetStatus,
      fetchAssetLocations,
      fetchAssetRooms
    } = this.props;
    fetchAssetStatus();
    fetchAssetLocations();
    fetchAssetRooms();
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <div>
                    <Header as="h5" textAlign="center">
                      Asset Details
                    </Header>
                    <AssetDetailsCard />
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <div>
                    <Header as="h5" textAlign="center">
                      Options
                    </Header>
                    <Card.Group
                      itemsPerRow={2}
                      centered
                      style={{ marginTop: '15px' }}
                    >
                      <AssetDetailsLocations />
                      {/* <AssetDetailsRooms /> */}
                      <AssetDetailsReservable />
                    </Card.Group>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={6}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <div>
                    <Header as="h5" textAlign="center">
                      Clients
                    </Header>
                    <AssetClients />
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <div>
                    <Header as="h5" textAlign="center">
                      Status
                    </Header>
                    <AssetDetailsStatus />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchAssetStatus,
  fetchAssetLocations,
  fetchAssetRooms
};

AssetDetails = connect(null, mapDispatchToProps)(AssetDetails);

export default AssetDetails;
