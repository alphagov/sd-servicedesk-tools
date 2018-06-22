import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

const NewStartsMenu = () => {
  return (
    <div>
      <Menu attached="top" style={{ marginBottom: '1em' }}>
        <Menu.Item as={Link} to="/sd-tools">
          SD Tools
        </Menu.Item>
        <Menu.Item as={Link} to="/tickets/newstarts/gds">
          GDS Starters
        </Menu.Item>
        <Menu.Item as={Link} to="/tickets/newstarts/contractor">
          Contractor/Other
        </Menu.Item>

        <Menu.Item as={Link} to="/tickets/newstarts/pending">
          Waiting for Approval
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default NewStartsMenu;
