import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Menu, Icon } from 'semantic-ui-react';

class Header extends Component {
  renderMenus() {
    const { auth } = this.props;
    if (auth) {
      return (
        <div>
          <Menu.Item>
            <Button secondary href="/api/whd/auth/logout">
              Logout
            </Button>
          </Menu.Item>
        </div>
      );
    } else {
      return (
        <Menu.Item>
          <Button primary as={Link} to="/login">
            Login
          </Button>
        </Menu.Item>
      );
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <div>
        <Menu size="huge" inverted borderless fixed="top">
          <Menu.Item header as={Link} to={auth ? '/sd-dashboard' : '/'}>
            Service Desk Tools
          </Menu.Item>

          <Menu.Menu position="right">
            {auth && (
              <Menu.Item as={Link} to="/enrol">
                Profile
              </Menu.Item>
            )}
            {auth && (
              <Menu.Item header>
                <Icon name="user circle" />
                {auth.firstName} {auth.lastName}
              </Menu.Item>
            )}
            {this.renderMenus()}
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

export default connect(mapStateToProps)(Header);
