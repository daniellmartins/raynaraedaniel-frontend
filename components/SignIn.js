import React, { Component } from "react";
import { ApolloConsumer, Mutation } from "react-apollo";
import cookie from "cookie";
import gql from "graphql-tag";
import styled from "styled-components";

import { redirect } from "../lib";

const SIGNIN_MUTATION = gql`
  mutation signin($code: Int!) {
    signin(code: $code) {
      token
    }
  }
`;

export class SignIn extends Component {
  state = { code: "" };

  handleInput = e => {
    const { name, value } = e.target;
    if (value.length > 4) return;

    this.setState({ [name]: value });
  };

  handleSubmit = (e, signin) => {
    e.preventDefault();
    const { code } = this.state;
    if (code && code.length === 4)
      signin({ variables: { code: parseInt(code, 10) } });
  };

  onCompleted = (data, client) => {
    document.cookie = cookie.serialize("token", data.signin.token, {
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });
    client.cache.reset().then(() => {
      redirect({}, "/products", "/lista-de-presentes");
    });
  };

  render() {
    const { code } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={SIGNIN_MUTATION}
            onCompleted={data => this.onCompleted(data, client)}
          >
            {(signin, { loading }) => (
              <StyledSignIn>
                <form
                  onSubmit={e => this.handleSubmit(e, signin)}
                  method="POST"
                >
                  <input
                    name="code"
                    type="number"
                    disabled={loading}
                    value={code}
                    onChange={this.handleInput}
                  />
                </form>
              </StyledSignIn>
            )}
          </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}

const StyledSignIn = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);

  form {
    padding: 20px;
    width: 80%;
    max-width: 300px;

    background-color: white;
  }

  input {
    font-size: 2.25em;
    text-align: center;
    letter-spacing: 0.5em;

    padding: 10px 15px;
    width: 100%;
    height: 100px;
  }
`;
