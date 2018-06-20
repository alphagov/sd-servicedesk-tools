import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, Card, Button, Loader, Dropdown } from 'semantic-ui-react';

import {
  selectClientAssets,
  selectClientAssetsWithStatus,
  selectClient
} from '../../reducers/selectors/clients';

import { selectAssetsStatus } from '../../reducers/selectors/assets';

import {
  clearClientAssets,
  updateAssetStatus,
  updateAssetClient
} from '../../actions/assets';

class ClientAssetCard extends Component {
  // clear the client assets store
  componentWillUnmount() {
    this.props.clearClientAssets();
  }

  makeOptions(id) {
    const { assetStatus } = this.props;
    return assetStatus.map(stat => {
      let statOpt = {
        key: stat.id,
        value: stat.id,
        text: stat.name
      };
      return statOpt;
    });
  }

  renderAssetCards() {
    const { assets } = this.props;
    return assets.map(asset => {
      return (
        <Card key={asset.id} centered>
          <Card.Content>
            <Button
              size="large"
              floated="right"
              secondary
              assetid={asset.id}
              onClick={this.unassAsset}
            >
              Unassign
            </Button>
            <Card.Header>{asset.model.modelName}</Card.Header>

            <Card.Meta>{asset.assetNumber}</Card.Meta>
            <Card.Meta>{asset.assetstatus.name}</Card.Meta>
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Dropdown
              labeled
              placeholder="Change Status"
              options={this.makeOptions(asset.assetstatus.id)}
              active={asset.assetstatus.id}
              onChange={this.changeStat}
              assetid={asset.id}
            />
          </Card.Content>
        </Card>
      );
    });
  }

  unassAsset = (e, assetB) => {
    const { updateAssetClient, client, assets } = this.props;
    // get the asset this refers to
    let refAss = assets.filter(asset => asset.id === assetB.assetid);
    // filter out the clients
    let assClient = refAss[0].clients.filter(
      clientx => clientx.id !== client.id
    );
    updateAssetClient(assetB.assetid, assClient, true);
  };

  changeStat = (e, item) => {
    // change status
    let newAss = item.options.filter(option => option.value === item.value);

    let assety = {
      assetId: item.assetid,
      statusId: item.value,
      statusName: newAss[0].text
    };
    this.props.updateAssetStatus(assety, true);
  };

  render() {
    const { assets } = this.props;

    return (
      <div>
        {assets.length > 0 ? (
          <div>
            <Header as="h2" textAlign="center">
              Client Asset Card
            </Header>
            <Card.Group centered itemsPerRow={3} textAlign="center">
              {this.renderAssetCards()}
            </Card.Group>
          </div>
        ) : (
          <Loader active inline="centered" size="large" />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  clearClientAssets,
  updateAssetStatus,
  updateAssetClient
};

const mapStateToProps = state => {
  return {
    assets: selectClientAssets(state),
    assetsWS: selectClientAssetsWithStatus(state),
    assetStatus: selectAssetsStatus(state),
    client: selectClient(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientAssetCard);
