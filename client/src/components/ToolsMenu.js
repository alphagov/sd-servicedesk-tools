import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

const ToolsMenu = () => {
  return (
    <div>
      <Menu attached="top" style={{ marginBottom: '1em' }}>
        <Menu.Item icon="home" as={Link} to="/sd-dashboard" />
        <Menu.Item as={Link} to="/starters-leavers">
          Starters &amp; Leavers
        </Menu.Item>
        <Menu.Item as={Link} to="/whd/assets">
          Asset Management
        </Menu.Item>
        <Menu.Item as={Link} to="/events">
          Events
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default ToolsMenu;
