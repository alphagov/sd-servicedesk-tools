import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Container } from 'semantic-ui-react';

import Header from './components/Header';
import Landing from './components/Landing';
import SDDashboard from './components/SDDashboard';
import SDTools from './components/SDTools';
import Login from './components/auth/Login';
import Enrol from './components/auth/Enrol';
import AssetManager from './components/assetman/AssetManager';
import AssetFinder from './components/assetman/AssetFinder';
import AssetMaker from './components/assetman/AssetMaker';

import PendingTickets from './components/startersleavers/PendingTickets';
import GDSStarterTickets from './components/startersleavers/GDSStarterTickets';
import ContractorStarterTickets from './components/startersleavers/ContractorStarterTickets';
import StarterTicketDetails from './components/startersleavers/StarterTicketDetails';

const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Container style={{ marginTop: '6em' }}>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/enrol" component={Enrol} />
          <Route path="/sd-dashboard" component={SDDashboard} />
          <Route path="/sd-tools" component={SDTools} />
          <Route path="/asset-manager" component={AssetManager} />
          <Route path="/asset-finder" component={AssetFinder} />
          <Route path="/asset-maker" component={AssetMaker} />
          <Route path="/tickets/newstarts/pending" component={PendingTickets} />
          <Route path="/tickets/newstarts/gds" component={GDSStarterTickets} />
          <Route
            path="/tickets/newstarts/contractor"
            component={ContractorStarterTickets}
          />
          <Route
            path="/tickets/newstarts/details/:tktId"
            component={StarterTicketDetails}
          />
        </Container>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
