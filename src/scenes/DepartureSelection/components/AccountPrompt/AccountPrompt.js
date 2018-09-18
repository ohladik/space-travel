import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Button from 'components/ButtonGradient';

const Container = styled.div`
  margin: ${props => props.theme.spacing.space_l};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Header = styled.div`
  font-weight: bold;
  font-size: ${props => props.theme.font.h3};
  color: ${props => props.theme.colors.grey_light};
  margin-bottom: ${props => props.theme.spacing.space_m};
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;

  > div,
  button {
    margin-top: ${props => props.theme.spacing.space_s};
  }
`;

const DividerLabel = styled.div`
  font-weight: bold;
  font-size: ${props => props.theme.font.h4};
  color: ${props => props.theme.colors.grey_light};
`;

class AccountPrompt extends Component {
  onButtonClick = (path) => {
    this.props.authRequested();
    this.props.history.push(path);
  };

  render() {
    return (
      <Container>
        <Header>To continue,</Header>
        <ButtonsContainer>
          <Button label="Sign In" inverted small onClick={() => this.onButtonClick('/login')} />
          <DividerLabel>or</DividerLabel>
          <Button
            label="Create Account"
            path="/register"
            inverted
            small
            onClick={() => this.onButtonClick('/register')}
          />
        </ButtonsContainer>
      </Container>
    );
  }
}

const AUTH_REQUESTED_MUTATION = gql`
  mutation AuthRequested {
    requestedAuthFromDestination @client
  }
`;

const AccountPromptWithRouter = withRouter(props => <AccountPrompt {...props} />);

export default compose(graphql(AUTH_REQUESTED_MUTATION, { name: 'authRequested' }))(AccountPromptWithRouter);
