import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import { Grid, Header, Item, Breadcrumb } from 'semantic-ui-react';
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

  render() {
    const { ticket } = this.props;
    return (
      <div>
        <Header as="h3" textAlign="center">
          Ticket Details
        </Header>
        <Breadcrumb style={{ marginBottom: '1em' }}>
          <Breadcrumb.Section link as={Link} to="/starters-leavers">
            Starters &amp; Leavers
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section link as={Link} to="/tickets/newstarts/gds">
            GDS Starters
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right arrow" />
          <Breadcrumb.Section active>
            Ticket number {ticket.id}
          </Breadcrumb.Section>
        </Breadcrumb>
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
