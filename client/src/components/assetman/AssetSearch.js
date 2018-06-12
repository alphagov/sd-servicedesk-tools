import React, { Component } from 'react';
import _ from 'lodash';
import { Search } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { selectAssetSearchResultName } from '../../reducers/selectors';
import { searchAssets, clearSearchAssets } from '../../actions/assets';

class AssetSearch extends Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title, key: result.key });
    // console.log(result);
  };

  handleSearchChange = (e, { value }) => {
    const { searchAssets, assets, clearSearchAssets } = this.props;

    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      // clear the assetDetails? WHD only returns one result....but we need a clear later
      clearSearchAssets();

      searchAssets(value);

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      // console.log(assets);

      this.setState({
        isLoading: false,
        results: _.filter(assets, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <div>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 0, {
            leading: true
          })}
          results={results}
          value={value}
          placeholder="Enter GDS Asset Number"
          fluid
          // {...this.props}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  searchAssets,
  clearSearchAssets
};

const mapStateToProps = state => {
  return {
    assets: selectAssetSearchResultName(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetSearch);
