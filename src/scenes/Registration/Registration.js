import React, { Component } from 'react';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Input from 'components/Input';
import ButtonGradient from 'components/ButtonGradient';
import { AUTH_TOKEN } from '../../constants';

const Container = styled.div``;

const Header = styled.div`
  margin: ${props => props.theme.spacing.space_l};
  font-size: ${props => props.theme.font.h2};
  font-weight: bold;
  color: ${props => props.theme.colors.grey_light};
`;

const InputContainer = styled.div`
  display: flex;
  margin-left: ${props => props.theme.spacing.space_l};
  margin-right: ${props => props.theme.spacing.space_l};
  margin-bottom: ${props => props.theme.spacing.space_m};
  max-width: 400px;
`;

const ButtonContainer = styled.div`
  margin-left: ${props => props.theme.spacing.space_l};
`;

const ErrorContainer = styled.div`
  margin-left: ${props => props.theme.spacing.space_l};
  margin-bottom: ${props => props.theme.spacing.space_m};
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.red};
`;

class Registration extends Component {
  state = {
    email: '',
    password: '',
    passwordVisible: false,
    submitting: false,
    errors: [],
  };

  componentDidUpdate(prevProps, prevState) {
    // clear error messages after form is submitted
    if (this.state.submitting && !prevState.submitting) {
      this.setState({ errors: [] });
    }
  }

  isInputValid = () => {
    let inputValid = true;
    const newErrors = [];
    if (this.state.email === '') {
      newErrors.push('Please provide an email address.');
      inputValid = false;
    }
    if (this.state.password.length < 8) {
      newErrors.push('Password must have at least 8 characters.');
      inputValid = false;
    }
    this.setState({
      errors: newErrors,
    });
    return inputValid;
  };

  togglePasswordVisibility = () => this.setState({ passwordVisible: !this.state.passwordVisible });

  submitRegistration = async () => {
    if (this.isInputValid()) {
      this.setState({ submitting: true }, async () => {
        const { email, password } = this.state;

        let registrationSuccessful = true;
        let registrationResult = null;

        try {
          registrationResult = await this.props.signup({ variables: { email, password } });
        } catch (e) {
          registrationSuccessful = false;
          this.setState({ errors: [...this.state.errors, e.message] });
        } finally {
          this.setState({ submitting: false });
          if (registrationSuccessful) {
            // save auth token and user ID to localStorage
            const { token, user } = registrationResult.data.signup;
            localStorage.setItem(AUTH_TOKEN, token);
            localStorage.setItem('userId', user.id);

            if (this.props.redirectQuery.authFromDestination) {
              this.props.authSuccessful();
              const { id } = this.props.redirectQuery.destinationSelected;
              this.props.history.push(`/departure/${id}`);
            } else {
              this.props.history.push('/home');
            }
          }
        }
      });
    }
  };

  render() {
    return (
      <Container>
        <Header>Registration</Header>
        <InputContainer>
          <Input
            placeholder="Email Address"
            type="email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </InputContainer>
        <InputContainer>
          <Input
            placeholder="Password"
            value={this.state.password}
            type="password"
            passwordVisible={this.state.passwordVisible}
            togglePasswordVisibility={this.togglePasswordVisibility}
            onChange={e => this.setState({ password: e.target.value })}
            onKeyDown={e => (e.key === 'Enter' ? this.submitRegistration() : null)}
          />
        </InputContainer>
        <ErrorContainer>
          {this.state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
        </ErrorContainer>
        <ButtonContainer>
          <ButtonGradient
            label="Create Account"
            inverted
            small
            backgroundColor="#1D1539"
            disabled={this.state.submitting}
            onClick={this.submitRegistration}
          />
        </ButtonContainer>
      </Container>
    );
  }
}

const REDIRECT_QUERY = gql`
  query RedirectQuery {
    authFromDestination @client
    destinationSelected @client {
      id
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

const AUTH_SUCCESSFUL_MUTATION = gql`
  mutation AuthSuccessful {
    authFromDestinationSuccessful @client
  }
`;

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'signup' }),
  graphql(AUTH_SUCCESSFUL_MUTATION, { name: 'authSuccessful' }),
  graphql(REDIRECT_QUERY, { name: 'redirectQuery' }),
)(Registration);
