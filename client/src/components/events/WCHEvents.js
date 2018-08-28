import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
  Item,
  Header,
  Segment,
  Dimmer,
  Loader,
  Label
} from 'semantic-ui-react';

import { selectWCHEventsTicketsSorted } from '../../reducers/selectors/tickets';
import { removeHTML } from '../../utils/stringManip';

class WCHEvents extends Component {
  renderEvents() {
    const { events } = this.props;
    if (events.length === 0) {
      return (
        <Dimmer active style={{ height: '6em' }}>
          <Loader indeterminate>Fetching internal events.......</Loader>
        </Dimmer>
      );
    }
    return events.map((event) => {
      return (
        <Item key={event.id}>
          <Item.Content>
            <Item.Header
              style={
                event.statustype.id === 8
                  ? { color: 'red' }
                  : { color: 'green' }
              }
            >
              {event.ticketCustomFields[0].restValue
                ? event.ticketCustomFields[0].restValue
                : 'No location given'}
              &nbsp;starts&nbsp;
              <Moment fromNow>{event.ticketCustomFields[1].restValue}</Moment>
              {event.statustype.id === 8 && (
                <span> - Still awaiting approval!</span>
              )}
            </Item.Header>
            <Item.Meta>
              Contact: {event.ticketCustomFields[2].restValue}
            </Item.Meta>
            <Item.Description>{removeHTML(event.detail)}</Item.Description>
            <Item.Extra>
              <Label>
                Client: {event.clientReporter.firstName}
                &nbsp;
                {event.clientReporter.lastName}
              </Label>
              <Label>Analyst: {event.clientTech.displayName}</Label>
              <Label>Ticket No: {event.id}</Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    });
  }

  render() {
    return (
      <div>
        <Header as="h3" textAlign="center">
          Whitechapel Events
        </Header>
        <Segment>
          <Item.Group divided relaxed>
            {this.renderEvents()}
          </Item.Group>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: selectWCHEventsTicketsSorted(state)
  };
};

export default connect(mapStateToProps)(WCHEvents);
