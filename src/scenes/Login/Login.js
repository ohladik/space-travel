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

class Login extends Component {
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

  submitLogin = async () => {
    if (this.isInputValid()) {
      this.setState({ submitting: true }, async () => {
        const { email, password } = this.state;

        let loginSuccessful = true;
        let loginResult = null;

        try {
          loginResult = await this.props.login({ variables: { email, password } });
        } catch (e) {
          loginSuccessful = false;
          this.setState({ errors: [...this.state.errors, e.message] });
        } finally {
          this.setState({ submitting: false });
          if (loginSuccessful) {
            // save auth token and user ID to localStorage
            const { token, user } = loginResult.data.login;
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
        <Header>Login</Header>
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
            onKeyDown={e => (e.key === 'Enter' ? this.submitLogin() : null)}
          />
        </InputContainer>
        <ErrorContainer>
          {this.state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
        </ErrorContainer>
        <ButtonContainer>
          <ButtonGradient
            label="Sign In"
            inverted
            small
            backgroundColor="#1D1539"
            disabled={this.state.submitting}
            onClick={this.submitLogin}
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

const LOGIN_USER_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
  graphql(LOGIN_USER_MUTATION, { name: 'login' }),
  graphql(AUTH_SUCCESSFUL_MUTATION, { name: 'authSuccessful' }),
  graphql(REDIRECT_QUERY, { name: 'redirectQuery' }),
)(Login);
