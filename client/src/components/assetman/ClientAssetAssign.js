import React, { Component } from 'react';
import _ from 'lodash';
import { Search, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { searchClient } from '../../actions/client';
import { updateAssetClient } from '../../actions/assets';

import { selectClientsResultsNames } from '../../reducers/selectors/clients';
import { selectAssetSearchResult } from '../../reducers/selectors/assets';

class ClientAssetAssign extends Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title, key: result.key });
    const { asset, updateAssetClient } = this.props;
    // add the client id to the asset in whd and redux

    // add new client to existing
    let newClient = {
      id: result.key,
      type: 'Client'
    };

    let newAssClients = [...asset.clients, newClient];

    updateAssetClient(asset.id, newAssClients, false);
  };

  handleSearchChange = (e, { value }) => {
    const { searchClient, clients } = this.props;

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
        <Card fluid raised>
          <Card.Content>
            <Card.Header textAlign="center">Assign Client</Card.Header>
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 300, {
                leading: true
              })}
              results={results}
              value={value}
              placeholder="Enter First or Last name"
            />
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = {
  searchClient,
  updateAssetClient
};

const mapStateToProps = state => {
  return {
    clients: selectClientsResultsNames(state),
    asset: selectAssetSearchResult(state)
  };
};

ClientAssetAssign = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientAssetAssign);

export default ClientAssetAssign;
