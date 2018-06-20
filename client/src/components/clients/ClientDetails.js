import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card } from 'semantic-ui-react';

import { selectClient } from '../../reducers/selectors/clients';
import { clearClient } from '../../actions/client';

class ClientDetails extends Component {
  // component will unmount clear the redux store
  componentWillUnmount() {
    this.props.clearClient();
  }

  render() {
    const { client } = this.props;

    return (
      <div>
        {Object.keys(client).length > 0 && (
          <Card fluid>
            <Card.Content>
              <Card.Header>
                {client.firstName} {client.lastName}
              </Card.Header>
              <Card.Meta>{client.email}</Card.Meta>
              <Card.Description>
                {client.location.locationName} {client.location.city}
              </Card.Description>
            </Card.Content>
          </Card>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  clearClient
};

const mapStateToProps = state => {
  return {
    client: selectClient(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientDetails);
