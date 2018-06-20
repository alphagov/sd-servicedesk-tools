import React, { Component } from 'react';
import _ from 'lodash';
import { Search } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { searchClient, fetchClient } from '../../actions/client';
import { fetchClientAssets, clearClientAssets } from '../../actions/assets';
import { selectClientsResultsNames } from '../../reducers/selectors/clients';

class ClientSearch extends Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title, key: result.key });
    // get client with this key
    this.props.fetchClient(result.key);
    // get the client assets
    this.props.fetchClientAssets(result.title);
  };

  handleSearchChange = (e, { value }) => {
    const { searchClient, clients, clearClientAssets } = this.props;

    // clear the client assets
    clearClientAssets();

    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      searchClient(value);

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      // console.log(clients);

      this.setState({
        isLoading: false,
        results: _.filter(clients, isMatch)
      });
    }, 100);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <div>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 300, {
            leading: true
          })}
          results={results}
          value={value}
          placeholder="Enter First or Last name"
          // {...this.props}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  searchClient,
  fetchClient,
  fetchClientAssets,
  clearClientAssets
};

const mapStateToProps = state => {
  return {
    clients: selectClientsResultsNames(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientSearch);
