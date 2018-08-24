import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Item, Header } from 'semantic-ui-react';

import { fetchWCHEvents } from '../../actions/events';
import { selectWCHEventsTicketsSorted } from '../../reducers/selectors/tickets';

class WCHEvents extends Component {
  componentDidMount() {
    this.props.fetchWCHEvents();
  }

  renderEvents() {
    const { events } = this.props;
    return events.map((event) => {
      return (
        <Item key={event.id}>
          <Item.Content>
            <Item.Header>
              {event.ticketCustomFields[0].restValue}{' '}
              <Moment fromNow>{event.ticketCustomFields[1].restValue}</Moment>
            </Item.Header>
            <Item.Meta>{event.id}</Item.Meta>
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
        <Item.Group>{this.renderEvents()}</Item.Group>
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
