import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWCHEvents } from '../../actions/events';

class WCHEvents extends Component {
  componentDidMount() {
    this.props.fetchWCHEvents();
  }

  render() {
    return <div>WCH Events</div>;
  }
}

const mapDispatchToProps = {
  fetchWCHEvents
};

export default connect(
  null,
  mapDispatchToProps
)(WCHEvents);
