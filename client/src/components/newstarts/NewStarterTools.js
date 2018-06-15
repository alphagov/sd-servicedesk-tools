import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header, Card, Icon } from 'semantic-ui-react';

class NewStartsHome extends Component {
  render() {
    return (
      <div>
        <Card.Group itemsPerRow={3}>
          <Card raised>
            <Card.Content>
              <Header as="h5">
                <Icon name="users" size="large" />
                Permanent Staff
              </Header>
            </Card.Content>
          </Card>
          <Card raised>
            <Card.Content>
              <Header as="h5">
                <Icon name="handshake" size="large" />
                Contractor/External Staff
              </Header>
            </Card.Content>
          </Card>
          <Card raised>
            <Card.Content>
              <Header as="h5">
                <Icon name="exclamation triangle" size="large" />
                Waiting for Approval
              </Header>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

export default NewStartsHome;
