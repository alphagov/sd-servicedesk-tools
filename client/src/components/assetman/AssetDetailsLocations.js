import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, find } from 'lodash';

import { Card, Dropdown } from 'semantic-ui-react';

import { updateAssetLocation } from '../../actions/assets';

import {
  selectAssetLocations,
  selectAssetSearchResult
} from '../../reducers/selectors';

class AssetDetailsLocations extends Component {
  renderLocationName() {
    const { locations, asset } = this.props;
    if (!isEmpty(asset) && !asset.isDeleted) {
      let loc = find(locations, { id: asset.location.id });
      return loc.locationName;
    }
  }

  makeLocOptions() {
    const { locations } = this.props;
    return locations.map(loc => {
      let statLoc = { key: loc.id, value: loc.id, text: loc.locationName };
      return statLoc;
    });
  }

  changeLoc = (e, item) => {
    const newLoc = {
      locId: item.value,
      assetId: item.assetid
    };

    this.props.updateAssetLocation(newLoc);
  };

  render() {
    const { asset } = this.props;
    return (
      <div>
        <Card fluid>
          <Card.Content>
            <Card.Header textAlign="center">Location</Card.Header>
            <Card.Description textAlign="center">
              {this.renderLocationName()}
            </Card.Description>
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Dropdown
              labeled
              placeholder="Change Location"
              options={this.makeLocOptions()}
              onChange={this.changeLoc}
              assetid={asset.id}
            />
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: selectAssetLocations(state),
    asset: selectAssetSearchResult(state)
  };
};

const mapDispatchToProps = {
  updateAssetLocation
};

AssetDetailsLocations = connect(mapStateToProps, mapDispatchToProps)(
  AssetDetailsLocations
);

export default AssetDetailsLocations;
