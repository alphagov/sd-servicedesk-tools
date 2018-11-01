import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { checkName } from '../../utils/nameChecker';

import { searchClient } from '../../actions/client';
import { selectClientSearchResults } from '../../reducers/selectors/clients';

/**
 * React component for checking status of a clients accounts
 * Checks to see if they are present or not
 * @param {object} react props
 * @function searchClient
 * @returns {array}
 * Checks WHD clients for Surname.....if present then checks that the first name is same
 */

class WHDClientStatusCheck extends Component {
  state = {
    whdAcc: false
  };

  componentDidMount() {
    const { lastname, searchClient } = this.props;
    // check if they have a whd account
    searchClient(lastname);
    // check if they have a google account
  }

  componentDidUpdate(prevProps) {
    const { clients, lastname, firstname } = this.props;
    if (prevProps.clients !== clients && clients.length > 0) {
      // check name
      const clientArr = checkName(clients, firstname, lastname);
      if (clientArr.length > 0) {
        this.setState({
          whdAcc: true
        });
      }
    }
  }

  render() {
    const { whdAcc } = this.state;
    return (
      <div>
        <Button
          size="large"
          negative={!whdAcc}
          disabled={whdAcc}
          positive={whdAcc}
        >
          WHD Account
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  searchClient
};

const mapStateToProps = (state) => {
  return {
    clients: selectClientSearchResults(state)
  };
};

WHDClientStatusCheck = connect(
  mapStateToProps,
  mapDispatchToProps
)(WHDClientStatusCheck);

export default WHDClientStatusCheck;
