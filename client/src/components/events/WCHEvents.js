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

import { fetchWCHEvents } from '../../actions/events';
import { selectWCHEventsTicketsSorted } from '../../reducers/selectors/tickets';
import { removeHTML } from '../../utils/stringManip';

class WCHEvents extends Component {
  constructor(props) {
    super(props);
    this.state = { loader: true };
  }
  componentDidMount() {
    this.props.fetchWCHEvents().then(() => this.setState({ loader: false }));
  }

  renderEvents() {
    const { events } = this.props;
    // console.log(events);
    if (events.length === 0) {
      return (
        <Dimmer active={this.state.loader} style={{ height: '6em' }}>
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
              &nbsp;
              <Moment fromNow>{event.ticketCustomFields[1].restValue}</Moment>
              {event.statustype.id === 8 && (
                <span> Still awaiting approval!</span>
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
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    });
  }

  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          WCH Events
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

const mapDispatchToProps = {
  fetchWCHEvents
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WCHEvents);
