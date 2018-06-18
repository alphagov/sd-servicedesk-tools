import React, { Component } from 'react';
import { Header, Card, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';
import _ from 'lodash';
import { removeHTML } from '../../utils/stringManip';

import {
  selectNewStartTicketsPendingSorted,
  selectTicket
} from '../../reducers/selectors';
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
    this.props.fetchTicketDetails(value).then(() => {
      this.setState({ openModal: true });
    });
  };

  renderPendingStarts() {
    const { pending } = this.props;
    return pending.map(tkt => {
      let timeDiff = moment(tkt.ticketCustomFields[6].restValue).isSameOrAfter(
        Date.now()
      );
      return (
        <Card
          key={tkt.id}
          onClick={this.showTicketDetails}
          value={tkt.id}
          {...(!timeDiff ? { color: 'red' } : {})}
        >
          <Card.Content>
            <Card.Header>
              {tkt.id}&nbsp;-&nbsp;{tkt.ticketCustomFields[0].restValue}&nbsp;{
                tkt.ticketCustomFields[1].restValue
              }
            </Card.Header>
            <Card.Meta>Client: {tkt.displayClient}</Card.Meta>
            <Card.Description>
              Starts&nbsp;<Moment fromNow>
                {tkt.ticketCustomFields[6].restValue}
              </Moment>
            </Card.Description>
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
    const { ticket } = this.props;
    return (
      <div>
        <Header as="h3" textAlign="center">
          Pending New Starter Tickets
        </Header>
        <Card.Group itemsPerRow={4}>{this.renderPendingStarts()}</Card.Group>

        {!_.isEmpty(ticket) && (
          <Modal open={this.state.openModal} onClose={this.closeModal}>
            <Modal.Header>
              {ticket.id} - Pending New Start for&nbsp;
              {ticket.ticketCustomFields[0].restValue}&nbsp;{
                ticket.ticketCustomFields[1].restValue
              }
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header>
                  Starts&nbsp;<Moment fromNow>
                    {ticket.ticketCustomFields[6].restValue}
                  </Moment>
                </Header>
                <Header as="h4">Client: {ticket.displayClient}</Header>
                <Header as="h4">
                  Analyst: {ticket.clientTech.displayName}
                </Header>
                <p>{removeHTML(ticket.detail)}</p>
                <p>
                  {ticket.ticketCustomFields[0].restValue}'s role will be as a{' '}
                  {ticket.ticketCustomFields[2].restValue} in{' '}
                  {ticket.ticketCustomFields[3].restValue} and their Line
                  Manager is {ticket.ticketCustomFields[5].restValue}
                </p>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchTicketDetails
};

const mapStateToProps = state => {
  return {
    pending: selectNewStartTicketsPendingSorted(state),
    ticket: selectTicket(state)
  };
};

PendingTickets = connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingTickets);

export default PendingTickets;
