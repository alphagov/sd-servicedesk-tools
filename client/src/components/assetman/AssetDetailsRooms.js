import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { Card, Dropdown } from 'semantic-ui-react';

import {
  selectAssetRooms,
  selectAssetSearchResult
} from '../../reducers/selectors';
import { updateAssetRooms } from '../../actions/assets';

class AssetDetailsRooms extends Component {
  renderRoomName() {
    const { asset } = this.props;
    if (!isEmpty(asset) && !asset.isDeleted) {
      let roomy = asset.room.roomName;
      return roomy;
    }
  }

  makeRoomOptions() {
    const { rooms, asset } = this.props;
    if (!isEmpty(asset) && !asset.isDeleted) {
      const locRooms = rooms.filter(
        room => room.locationId === asset.location.id
      );

      return locRooms.map(room => {
        let assRoom = { key: room.id, value: room.id, text: room.roomName };
        return assRoom;
      });
    }
  }

  changeRoom = (e, item) => {
    const { rooms, updateAssetRooms } = this.props;
    let newR = rooms.find(room => room.id === item.value);
    newR.assetId = item.assetid;
    updateAssetRooms(newR);
  };

  render() {
    const { asset } = this.props;

    return (
      <div>
        <Card fluid>
          <Card.Content>
            <Card.Header textAlign="center">Room</Card.Header>
            <Card.Description textAlign="center">
              {this.renderRoomName()}
            </Card.Description>
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Dropdown
              labeled
              placeholder="Change Room"
              options={this.makeRoomOptions()}
              onChange={this.changeRoom}
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
    rooms: selectAssetRooms(state),
    asset: selectAssetSearchResult(state)
  };
};

const mapDispatchToProps = {
  updateAssetRooms
};

AssetDetailsRooms = connect(mapStateToProps, mapDispatchToProps)(
  AssetDetailsRooms
);

export default AssetDetailsRooms;
