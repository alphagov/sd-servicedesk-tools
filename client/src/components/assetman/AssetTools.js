import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Header, Card, Icon } from 'semantic-ui-react';
import ToolsMenu from '../ToolsMenu';

class AssetTools extends Component {
  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          Assets
        </Header>
        <ToolsMenu />
        <Card.Group itemsPerRow={3} centered>
          <Card as={Link} to="/asset-manager" raised>
            <Card.Content>
              <Header as="h5">
                <Icon name="laptop" size="large" />
                Asset Manager
              </Header>
            </Card.Content>
            <Card.Content description="Manage Client Assets" />
          </Card>
          <Card as={Link} to="/asset-finder" raised>
            <Card.Content>
              <Header as="h5">
                <Icon name="desktop" size="large" />
                Asset Finder
              </Header>
            </Card.Content>
            <Card.Content description="Find Assets" />
          </Card>
          <Card>
            <Card.Content>
              <Header as="h5">
                <Icon name="simplybuilt" size="large" />
                Asset Maker
              </Header>
            </Card.Content>
            <Card.Content description="Create Assets - coming soon" />
          </Card>
        </Card.Group>
      </div>
    );
  }
}

export default AssetTools;
