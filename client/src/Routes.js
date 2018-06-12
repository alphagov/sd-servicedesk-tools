import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Container } from 'semantic-ui-react';

import Header from './components/Header';
import Landing from './components/Landing';
import SDTools from './components/SDTools';
import Login from './components/auth/Login';
import Enrol from './components/auth/Enrol';
import AssetManager from './components/assetman/AssetManager';
import AssetFinder from './components/assetman/AssetFinder';
import AssetMaker from './components/assetman/AssetMaker';

const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Container style={{ marginTop: '6em' }}>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/enrol" component={Enrol} />
          <Route path="/sd-tools" component={SDTools} />
          <Route path="/asset-manager" component={AssetManager} />
          <Route path="/asset-finder" component={AssetFinder} />
          <Route path="/asset-maker" component={AssetMaker} />
        </Container>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
