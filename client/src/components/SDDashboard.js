import React, { Component } from 'react';
import { Grid, Header, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectTechDetails } from '../reducers/selectors/techs';

class SDDashboard extends Component {
  render() {
    const { tech } = this.props;
    return (
      <div>
        <Header as="h2" textAlign="center">
          Service Desk Dashboard
        </Header>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Card as={Link} to={tech.apiKey ? '/starters-leavers' : '/enrol'}>
                <Card.Content>
                  <Header as="h4" textAlign="center">
                    Starters &amp; Leavers
                  </Header>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card as={Link} to={tech.apiKey ? '/whd/assets' : '/enrol'}>
                <Card.Content>
                  <Header as="h4" textAlign="center">
                    Web Helpdesk Assets
                  </Header>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card as={Link} to={tech.apiKey ? '/' : '/enrol'}>
                <Card.Content>
                  <Header as="h4" textAlign="center">
                    Events
                  </Header>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tech: selectTechDetails(state)
  };
};

SDDashboard = connect(mapStateToProps)(SDDashboard);

export default SDDashboard;
