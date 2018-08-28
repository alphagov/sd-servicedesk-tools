import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

import WCHEvents from './WCHEvents';
import ExternalEvents from './ExternalEvents';
import { fetchGDSEvents } from '../../actions/events';

class EventsHome extends Component {
  componentDidMount() {
    this.props.fetchGDSEvents();
  }
  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          Events Home
        </Header>
        <Grid columns={2}>
          <Grid.Column>
            <WCHEvents />
          </Grid.Column>
          <Grid.Column>
            <ExternalEvents />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchGDSEvents
};

export default connect(
  null,
  mapDispatchToProps
)(EventsHome);
