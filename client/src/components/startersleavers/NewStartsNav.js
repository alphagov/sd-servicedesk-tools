import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NewStartsNav = (props) => {
  return (
    <React.Fragment>
      <Breadcrumb style={{ marginBottom: '1em' }}>
        <Breadcrumb.Section link as={Link} to="/starters-leavers">
          Starters &amp; Leavers
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section link as={Link} to="/tickets/newstarts/gds">
          GDS Starters
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right arrow" />
        <Breadcrumb.Section active>
          Ticket number {props.ticket.id}
        </Breadcrumb.Section>
      </Breadcrumb>
    </React.Fragment>
  );
};

export default NewStartsNav;
