import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { selectExternalEventsSorted } from '../../reducers/selectors/tickets';
import {
  Item,
  Header,
  Segment,
  Dimmer,
  Loader,
  Label
} from 'semantic-ui-react';
import { removeHTML } from '../../utils/stringManip';

class ExternalEvents extends Component {
  renderEvents() {
    const { events } = this.props;
    if (events.length === 0) {
      return (
        <Dimmer active style={{ height: '6em' }}>
          <Loader indeterminate>Fetching external events.......</Loader>
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
              {event.ticketCustomFields[2].restValue
                ? event.ticketCustomFields[2].restValue
                : 'No location given'}
              &nbsp;
              <Moment fromNow>{event.ticketCustomFields[0].restValue}</Moment>
              {event.statustype.id === 8 && (
                <span> Still awaiting approval!</span>
              )}
            </Item.Header>
            <Item.Meta>
              Contact: {event.ticketCustomFields[4].restValue}
            </Item.Meta>
            <Item.Description>{removeHTML(event.detail)}</Item.Description>
            <Item.Extra>
              <Label>
                Client: {event.clientReporter.firstName}
                &nbsp;
                {event.clientReporter.lastName}
              </Label>
              <Label>Analyst: {event.clientTech.displayName}</Label>
              <Label>
                Techs required: {event.ticketCustomFields[3].restValue}
              </Label>
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
          External Events
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
    events: selectExternalEventsSorted(state)
  };
};

export default connect(mapStateToProps)(ExternalEvents);
