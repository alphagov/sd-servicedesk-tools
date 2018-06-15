import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header, Card, Icon } from 'semantic-ui-react';

import { fetchNewsStartsPending } from '../../actions/starters';
import { selectNewStartTicketsPending } from '../../reducers/selectors';

class NewStartsHome extends Component {
  componentDidMount() {
    const { fetchNewsStartsPending } = this.props;

    fetchNewsStartsPending();
  }

  render() {
    const { pending } = this.props;
    return (
      <div>
        <Card.Group itemsPerRow={3}>
          <Card raised>
            <Card.Content>
              <Header as="h5">
                <Icon name="users" size="large" />
                Permanent Staff
              </Header>
            </Card.Content>
          </Card>
          <Card raised>
            <Card.Content>
              <Header as="h5">
                <Icon name="user" size="large" />
                Contractor/External Staff
              </Header>
            </Card.Content>
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
    pending: selectNewStartTicketsPending(state)
  };
};

const mapDispatchToProps = {
  fetchNewsStartsPending
};

NewStartsHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewStartsHome);

export default NewStartsHome;
