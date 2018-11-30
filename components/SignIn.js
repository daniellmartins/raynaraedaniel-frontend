import React, { Component } from "react";
import { ApolloConsumer, Mutation } from "react-apollo";
import cookie from "cookie";
import gql from "graphql-tag";
import styled, { css } from "styled-components";

import { redirect } from "../lib";

const SIGNIN_MUTATION = gql`
  mutation signin($code: Int!) {
    signin(code: $code) {
      token
    }
  }
`;

export class SignIn extends Component {
  state = { code: "", focus: false, completed: false };

  handleInput = e => {
    const { name, value } = e.target;
    if (value.length > 4) return;

    this.setState({ [name]: value });
  };

  handleFocus = () => {
    this.setState({ focus: !this.state.focus });
  };

  handleSubmit = (e, signin) => {
    e.preventDefault();
    const { code } = this.state;
    if (code && code.length === 4)
      signin({ variables: { code: parseInt(code, 10) } });
  };

  onCompleted = (data, client) => {
    this.setState({ completed: true }, () => {
      setTimeout(() => {
        document.cookie = cookie.serialize("token", data.signin.token, {
          maxAge: 60 * 60 // 1 hour
        });
        client.cache.reset().then(() => {
          redirect({}, "/products", "/lista-de-presentes");
        });
      }, 300);
    });
  };

  render() {
    const { code, focus, completed } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={SIGNIN_MUTATION}
            onCompleted={data => this.onCompleted(data, client)}
          >
            {(signin, { loading, error }) => (
              <StyledSignIn completed={completed} focus={focus}>
                <form
                  onSubmit={e => this.handleSubmit(e, signin)}
                  method="POST"
                >
                  <h3>Esse é um acesso restrito aos nossos convidados.</h3>
                  <p>
                    Por favor, insira o código que consta no cartão entregue
                    junto ao convite e acesse nossa lista de presentes.
                  </p>
                  <div>
                    <span>{code ? code : "----"}</span>
                    <input
                      name="code"
                      type="number"
                      autoComplete="off"
                      onFocus={this.handleFocus}
                      onBlur={this.handleFocus}
                      disabled={loading}
                      value={code}
                      onChange={this.handleInput}
                    />
                  </div>
                  {error && <p>Por favor, tente novamente!</p>}
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
  opacity: ${({ completed }) => (completed ? "0" : "1")};

  background-color: rgba(0, 0, 0, 0.5);

  transition: opacity 0.25s ease;

  h3 {
    font-size: 1.2rem;
  }

  p {
    font-size: 1;
  }

  form {
    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 1.5rem;
    width: 90%;
    max-width: 31.25rem;

    background-color: white;

    ${({ completed }) =>
      completed
        ? css`
            animation: signin 0.25s forwards;
          `
        : css`
            animation: signin 0.25s forwards reverse;
          `}

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding: 3.125rem;
    }
  }

  div {
    position: relative;
    margin-top: 2rem;
  }

  span {
    font-size: 2.25em;
    text-align: center;
    letter-spacing: 0.75em;

    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    border-style: solid;
    border-color: ${({ theme, focus }) =>
      focus ? theme.color.primary : theme.color.grey};
    border-width: 1px;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: border 0.25s ease;
  }

  input {
    font-size: 2.25em;
    text-align: center;
    letter-spacing: 0.75em;

    padding: 10px 15px;
    width: 100%;
    height: 100px;

    opacity: 0;
  }
`;
