import React, { Component } from 'react';
import { Header, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';

import { selectGDSNewStartTicketsSorted } from '../../reducers/selectors';

class GDSStarterTickets extends Component {
  renderNewStarts() {
    const { starters } = this.props;
    return starters.map(tkt => {
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
            <Moment fromNow>{tkt.lastUpdated}</Moment>
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    return (
      <div>
        <Header as="h3" textAlign="center">
          New Starter Tickets
        </Header>
        <Card.Group itemsPerRow={4}>{this.renderNewStarts()}</Card.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    starters: selectGDSNewStartTicketsSorted(state)
  };
};

GDSStarterTickets = connect(mapStateToProps)(GDSStarterTickets);

export default GDSStarterTickets;
