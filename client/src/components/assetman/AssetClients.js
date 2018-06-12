import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { clearAssetClients } from '../../actions/client';
import { updateAssetClient } from '../../actions/assets';
import {
  selectAssetClients,
  selectAssetSearchResult
} from '../../reducers/selectors';

import ClientAssetAssign from './ClientAssetAssign';

class AssetClients extends Component {
  unassignClient = (e, clientB) => {
    const { asset, updateAssetClient } = this.props;
    let assClient = asset.clients.filter(
      client => client.id !== clientB.clientid
    );
    updateAssetClient(asset.id, assClient, false);
  };

  render() {
    const { assetClients } = this.props;

    return (
      <div>
        <div>
          {assetClients.map(client => {
            return (
              <Card fluid key={client.id}>
                <Card.Content>
                  <Button
                    size="large"
                    floated="right"
                    secondary
                    clientid={client.id}
                    onClick={this.unassignClient}
                  >
                    Unassign
                  </Button>
                  <Card.Header>
                    {client.firstName} {client.lastName}
                  </Card.Header>
                  <Card.Meta>{client.email}</Card.Meta>
                  <Card.Description>
                    {client.location.locationName} {client.location.city}
                  </Card.Description>
                </Card.Content>
              </Card>
            );
          })}
          {/* add new assign....search for client need assetId..... */}
          {/* new component and pass it the assetId? */}
        </div>
        <div style={{ paddingTop: '10px' }}>
          <ClientAssetAssign />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  clearAssetClients,
  updateAssetClient
};

const mapStateToProps = state => {
  return {
    assetClients: selectAssetClients(state),
    asset: selectAssetSearchResult(state)
  };
};

AssetClients = connect(mapStateToProps, mapDispatchToProps)(AssetClients);

export default AssetClients;
