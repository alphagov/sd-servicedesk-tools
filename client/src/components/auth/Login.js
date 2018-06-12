import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Form, Button, Header, Grid, Segment } from 'semantic-ui-react';

import { loginTech } from '../../actions/auth';

const renderLoginFields = ({
  input,
  label,
  className,
  type,
  icon,
  iconPosition,
  meta: { touched, error }
}) => (
  <Form.Input
    required
    fluid
    icon={icon}
    iconPosition={iconPosition}
    placeholder={label}
    error={touched && error}
    type={type}
    {...input}
  />
);

class Login extends Component {
  loginWHDTech(values, dispatch) {
    const { loginTech, history } = this.props;
    loginTech(values).then(() => {
      history.push('/sd-tools');
    });
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column width={6}>
            <Header as="h3" textAlign="center">
              Login to Web Help Desk
            </Header>

            <Form
              onSubmit={handleSubmit(values => this.loginWHDTech(values))}
              size="small"
            >
              <Segment>
                <Field
                  name="username"
                  label="Username"
                  type="text"
                  icon="user"
                  iconPosition="left"
                  component={renderLoginFields}
                />
                <Field
                  required
                  name="password"
                  label="Password"
                  type="password"
                  icon="lock"
                  iconPosition="left"
                  component={renderLoginFields}
                />
                <Button
                  disabled={pristine || submitting}
                  type="submit"
                  fluid
                  size="large"
                >
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginTech
};

Login = connect(null, mapDispatchToProps)(Login);

export default reduxForm({
  // validate,
  form: 'loginForm'
})(Login);
