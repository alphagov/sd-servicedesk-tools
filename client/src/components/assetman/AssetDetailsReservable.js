import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, Radio } from 'semantic-ui-react';

import { selectAssetSearchResult } from '../../reducers/selectors';
import { updateAssetReservable } from '../../actions/assets';

class AssetDetailsReservable extends Component {
  changeRes = (e, item) => {
    const { asset, updateAssetReservable } = this.props;
    // update the asset
    const newRes = { assetId: asset.id, isRes: item.checked };
    updateAssetReservable(newRes);
  };

  render() {
    const { asset } = this.props;

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header textAlign="center">Reservable</Card.Header>
          <Card.Description textAlign="center">
            <Radio
              toggle
              checked={asset ? asset.isReservable : false}
              onChange={this.changeRes}
            />
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

const mapDispatchToProps = {
  updateAssetReservable
};

const mapStateToProps = state => {
  return { asset: selectAssetSearchResult(state) };
};

AssetDetailsReservable = connect(mapStateToProps, mapDispatchToProps)(
  AssetDetailsReservable
);

export default AssetDetailsReservable;
