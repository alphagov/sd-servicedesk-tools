import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';
import '../styles/styles.css';

import { fetchTech } from '../actions/auth';

import Routes from '../Routes';

class App extends Component {
  componentDidMount() {
    const { fetchTech } = this.props;
    fetchTech();
  }

  render() {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

const mapDispatchToProps = { fetchTech };

export default connect(
  null,
  mapDispatchToProps
)(App);
