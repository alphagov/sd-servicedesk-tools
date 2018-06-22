import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header, Card, Icon } from 'semantic-ui-react';

import {
  fetchNewsStartsPending,
  fetchNewStartsApprovedGDS
} from '../../actions/starters';
import {
  selectNewStartTicketsPending,
  selectGDSNewStartTicketsSorted,
  selectContractorNewStartTicketsSorted
} from '../../reducers/selectors/tickets';

class NewStartsHome extends Component {
  componentDidMount() {
    const { fetchNewsStartsPending, fetchNewStartsApprovedGDS } = this.props;

    fetchNewsStartsPending();
    fetchNewStartsApprovedGDS();
  }

  render() {
    const { pending, gdsStarters, conStarters } = this.props;
    return (
      <div>
        <Card.Group itemsPerRow={3}>
          <Card raised as={Link} to="/tickets/newstarts/gds">
            <Card.Content>
              <Header as="h5">
                <Icon name="users" size="large" />
                New GDS Starts Approved
              </Header>
            </Card.Content>
            <Card.Content extra>{gdsStarters.length} Tickets</Card.Content>
          </Card>

          <Card raised as={Link} to="/tickets/newstarts/contractor">
            <Card.Content>
              <Header as="h5">
                <Icon name="users" size="large" />
                New Contractor/Other Starts Approved
              </Header>
            </Card.Content>
            <Card.Content extra>{conStarters.length} Tickets</Card.Content>
          </Card>

          <Card raised as={Link} to="/tickets/newstarts/pending">
            <Card.Content>
              <Header as="h5">
                <Icon name="exclamation triangle" size="large" />
                Waiting for Approval
              </Header>
            </Card.Content>
            <Card.Content extra>{pending.length} Tickets pending</Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pending: selectNewStartTicketsPending(state),
    gdsStarters: selectGDSNewStartTicketsSorted(state),
    conStarters: selectContractorNewStartTicketsSorted(state)
  };
};

const mapDispatchToProps = {
  fetchNewsStartsPending,
  fetchNewStartsApprovedGDS
};

NewStartsHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewStartsHome);

export default NewStartsHome;