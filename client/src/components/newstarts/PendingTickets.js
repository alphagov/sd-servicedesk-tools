import React, { Component } from 'react';
import { Header, Card, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';

import { selectNewStartTicketsPending } from '../../reducers/selectors';
import { fetchTicketDetails } from '../../actions/tickets';

class PendingTickets extends Component {
  state = {
    openModal: false
  };

  closeModal = () =>
    this.setState({
      openModal: false
    });

  showTicketDetails = (e, { value }) => {
    console.log(value);
    this.props.fetchTicketDetails(value);
  };

  renderPendingStarts() {
    const { pending } = this.props;
    return pending.map(tkt => {
      return (
        <Card key={tkt.id} onClick={this.showTicketDetails} value={tkt.id}>
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
        <Modal open={this.state.openModal} onClose={this.closeModal} />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchTicketDetails
};

const mapStateToProps = state => {
  return {
    pending: selectNewStartTicketsPending(state)
  };
};

PendingTickets = connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingTickets);

export default PendingTickets;
