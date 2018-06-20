import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Grid, Form, Header, Item } from 'semantic-ui-react';
import Moment from 'react-moment';
import { removeHTML } from '../../utils/stringManip';

import { selectTicket } from '../../reducers/selectors/tickets';

class StarterTicketDetails extends Component {
  renderTicketNotes() {
    const { ticket } = this.props;

    if (isEmpty(ticket) || ticket.notes.length === 0) {
      return (
        <Item>
          <Item.Header>No ticket notes</Item.Header>
        </Item>
      );
    }

    return ticket.notes.map(note => {
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

  render() {
    return (
      <div>
        <Header as="h3" textAlign="center">
          Ticket Details
        </Header>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>Ticket details</Grid.Column>
            <Grid.Column>
              <Header as="h4" textAlign="center">
                Notes
              </Header>
              <Item.Group>{this.renderTicketNotes()}</Item.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>Updatable details in here</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    ticket: selectTicket(state)
  };
};

StarterTicketDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(StarterTicketDetails);

export default StarterTicketDetails;
