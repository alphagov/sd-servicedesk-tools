import React, { Component } from 'react';
import { Header, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';

import { selectNewStartTicketsPending } from '../../reducers/selectors';

class PendingTickets extends Component {
  renderPendingStarts() {
    const { pending } = this.props;
    return pending.map(tkt => {
      return (
        <Card key={tkt.id}>
          <Card.Content>
            <Card.Header>{tkt.id}</Card.Header>
            <Card.Meta>Client: {tkt.displayClient}</Card.Meta>
            <Card.Description>{tkt.shortDetail}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            Last updated &nbsp;
            <Moment fromNow tz="Europe/London">
              {tkt.lastUpdated}
            </Moment>
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    return (
      <div>
        <Header as="h3" textAlign="center">
          Pending New Starter Tickets
        </Header>
        <Card.Group itemsPerRow={4}>{this.renderPendingStarts()}</Card.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pending: selectNewStartTicketsPending(state)
  };
};

PendingTickets = connect(mapStateToProps)(PendingTickets);

export default PendingTickets;
