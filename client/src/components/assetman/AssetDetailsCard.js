import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, List } from 'semantic-ui-react';

import { selectAssetSearchResult } from '../../reducers/selectors';
import { fetchAssetClients, clearAssetClients } from '../../actions/client';
import { clearSearchAssets } from '../../actions/assets';

class AssetDetailsCard extends Component {
  componentDidUpdate() {
    const { asset, fetchAssetClients, clearAssetClients } = this.props;
    // clear the asset clients
    clearAssetClients();

    if (asset.clients) {
      let clientIds = asset.clients.map(client => client.id);
      for (let s of clientIds) {
        fetchAssetClients(s, asset.id);
      }
    }
  }
  componentWillUnmount() {
    const { clearAssetClients, clearSearchAssets } = this.props;
    clearAssetClients();
    clearSearchAssets();
  }
  render() {
    const { asset } = this.props;
    return (
      <div>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              {asset.model ? (
                <div>{asset.model.modelName}</div>
              ) : (
                <div>No model name</div>
              )}
            </Card.Header>
            <Card.Meta>{asset.assetNumber}</Card.Meta>
            {asset.model && (
              <Card.Meta>{asset.model.assettype.assetType}</Card.Meta>
            )}

            <Card.Description>
              {asset.location ? (
                <List>
                  <List.Item>
                    <List.Header>Location</List.Header>
                  </List.Item>
                  <List.Item>{asset.location.locationName}</List.Item>
                  <List.Item>{asset.location.address}</List.Item>
                  <List.Item>{asset.location.city}</List.Item>
                  <List.Item>{asset.location.postalCode}</List.Item>
                </List>
              ) : (
                <div>No location</div>
              )}
              {asset.serialNumber ? (
                <div>Serial Number: {asset.serialNumber}</div>
              ) : (
                <div />
              )}
              {asset.notes ? <div>{asset.notes}</div> : <div />}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    asset: selectAssetSearchResult(state)
  };
};

const mapDispatchToProps = {
  fetchAssetClients,
  clearAssetClients,
  clearSearchAssets
};

AssetDetailsCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetDetailsCard);

export default AssetDetailsCard;
