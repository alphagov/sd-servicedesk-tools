import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, find } from 'lodash';

import { Card, Dropdown } from 'semantic-ui-react';

import {
  selectAssetsStatus,
  selectAssetSearchResult
} from '../../reducers/selectors';

import { updateAssetStatus } from '../../actions/assets';

class AssetDetailsStatus extends Component {
  renderStatusName() {
    const { status, asset } = this.props;
    if (!isEmpty(asset) && !asset.isDeleted) {
      let lala = find(status, { id: asset.assetstatus.id });
      return lala.name;
    }
  }

  makeOptions() {
    const { status } = this.props;
    return status.map(stat => {
      let statOpt = {
        key: stat.id,
        value: stat.id,
        text: stat.name
      };
      return statOpt;
    });
  }

  changeStat = (e, item) => {
    // change status
    let newAss = item.options.filter(option => option.value === item.value);

    let assety = {
      assetId: item.assetid,
      statusId: item.value,
      statusName: newAss[0].text
    };
    this.props.updateAssetStatus(assety, false);
  };

  render() {
    const { asset } = this.props;
    return (
      <div>
        <Card fluid>
          <Card.Content>
            <Card.Header textAlign="center">
              {this.renderStatusName()}
            </Card.Header>
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Dropdown
              labeled
              placeholder="Change Status"
              options={this.makeOptions()}
              onChange={this.changeStat}
              assetid={asset.id}
            />
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateAssetStatus
};

const mapStateToProps = state => {
  return {
    status: selectAssetsStatus(state),
    asset: selectAssetSearchResult(state)
  };
};

AssetDetailsStatus = connect(mapStateToProps, mapDispatchToProps)(
  AssetDetailsStatus
);

export default AssetDetailsStatus;
