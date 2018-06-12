import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Form, Button, Header, Grid, Segment } from 'semantic-ui-react';

// import { selectTechDetails } from '../../reducers/selectors';
import { enrolWHDTech } from '../../actions/auth';

const renderEnrolFields = ({
  required,
  input,
  label,
  className,
  type,
  icon,
  iconPosition,
  meta: { touched, error }
}) => (
  <Form.Input
    required={required}
    placeholder={label}
    className={className}
    error={touched && error}
    type={type}
    icon={icon}
    iconPosition={iconPosition}
    {...input}
  />
);

class Enrol extends Component {
  enrolTech(values, dispatch) {
    const { enrolWHDTech } = this.props;
    enrolWHDTech(values);
  }
  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column width={8}>
            <Header as="h3" textAlign="center">
              WHD API Key
              <Header.Subheader>
                Enter your WHD API Key fom your Tech Settings
              </Header.Subheader>
            </Header>
            <Form
              size="large"
              onSubmit={handleSubmit(values => this.enrolTech(values))}
            >
              <Segment>
                <Field
                  required
                  name="firstName"
                  label="First name"
                  type="text"
                  icon="user"
                  iconPosition="left"
                  component={renderEnrolFields}
                />
                <Field
                  required
                  name="lastName"
                  label="Last name"
                  type="text"
                  icon="user"
                  iconPosition="left"
                  component={renderEnrolFields}
                />
                <Field
                  required
                  name="apiKey"
                  label="WHD API Key"
                  type="text"
                  icon="key"
                  iconPosition="left"
                  component={renderEnrolFields}
                />
                <Button fluid disabled={pristine || submitting} type="submit">
                  Enrol
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     TechDetails: selectTechDetails(state)
//   };
// };

const mapDispatchToProps = {
  enrolWHDTech
};

Enrol = reduxForm({
  // validate,
  form: 'enrolForm'
})(Enrol);

Enrol = connect(null, mapDispatchToProps)(Enrol);
Enrol = connect(state => ({
  initialValues: state.auth
}))(Enrol);

export default Enrol;
