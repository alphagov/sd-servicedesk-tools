import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Grid, Header, Item, Label, Card } from 'semantic-ui-react';
import Moment from 'react-moment';
import { removeHTML } from '../../utils/stringManip';

import { selectTicket } from '../../reducers/selectors/tickets';

import NewStartsNav from './NewStartsNav';
import WHDClientStatusCheck from '../clients/WHDClientStatusCheck';

class StarterTicketDetails extends Component {
  renderTicketNotes() {
    const { ticket } = this.props;

    if (isEmpty(ticket) || ticket.notes.length === 0) {
      return <Label>No ticket notes</Label>;
    }

    return ticket.notes.map((note) => {
      let noteText = removeHTML(note.mobileNoteText);
      return (
        <Item key={note.id}>
          <Item.Content>
            <Item.Header>
              {note.isTechNote ? 'Analyst note' : 'Client note'} -{' '}
              <Moment fromNow>{note.date}</Moment>
            </Item.Header>
            <Item.Description>{noteText}</Item.Description>
          </Item.Content>
        </Item>
      );
    });
  }

  renderTicketDetails() {
    const { ticket } = this.props;

    if (isEmpty(ticket)) {
      return <Label>No ticket details</Label>;
    }

    return (
      <Card>
        <Card.Content>
          <Card.Header>
            {ticket.ticketCustomFields[0].restValue}
            &nbsp;
            {ticket.ticketCustomFields[1].restValue}
          </Card.Header>
          <Card.Meta>{ticket.ticketCustomFields[2].restValue}</Card.Meta>
          <Card.Meta>{ticket.ticketCustomFields[3].restValue}</Card.Meta>
          <Card.Description>{removeHTML(ticket.detail)}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          Line Manager is {ticket.ticketCustomFields[5].restValue}
        </Card.Content>
      </Card>
    );
  }

  render() {
    const { ticket } = this.props;
    return (
      <div>
        <Header as="h3" textAlign="center">
          Ticket Details
        </Header>
        <NewStartsNav ticket={ticket} />

        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>{this.renderTicketDetails()}</Grid.Column>
            <Grid.Column>
              <Header as="h4" textAlign="center">
                Notes
              </Header>
              <Item.Group>{this.renderTicketNotes()}</Item.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <WHDClientStatusCheck
                firstname={ticket.ticketCustomFields[0].restValue}
                lastname={ticket.ticketCustomFields[1].restValue}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
  return {
    ticket: selectTicket(state)
  };
};

StarterTicketDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(StarterTicketDetails);

export default StarterTicketDetails;
