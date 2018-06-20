import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectTicket } from '../../reducers/selectors/tickets';

class StarterTicketDetails extends Component {
  render() {
    return <div>Ticket Details</div>;
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
