import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Row, Col } from "react-styled-flexboxgrid";
import styled from "styled-components";

import { Button } from "../components";

export class Confirmation extends Component {
  state = { name: "", confirmation: "yes", adults: 1 };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div id="confimation">
        <Col xs={12} md={6}>
          <StyledMap>
            <iframe
              width="100%"
              height="400px"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed/v1/place?q=%20Esperan%C3%A7a%20PB%20sitio%20lago%20dourado&key=AIzaSyD-rGGZGoqwYkBom9p5aIK2zzgWAhUVxio"
              allowFullScreen
            />
          </StyledMap>
        </Col>
        <Col xs={12} md={6}>
          <StyledForm>
            <Title>Confirmação de presença</Title>
            <SubTitle>
              Faça parte da nossa história de amor, confirme sua presença.
            </SubTitle>
            <Mutation mutation={CREATE_CONFIRMATION_MUTATION}>
              {(createConfirmation, { loading, data }) => {
                if (data)
                  return (
                    <p>
                      Obrigado {data.createConfirmation.name} por confirmar sua
                      presença, nos encontramos no grande dia!
                    </p>
                  );
                return (
                  <form
                    action=""
                    onSubmit={e => {
                      e.preventDefault();
                      createConfirmation({
                        variables: {
                          ...this.state,
                          adults: parseInt(this.state.adults, 10)
                        }
                      });
                    }}
                  >
                    <div className="form-group">
                      <input
                        required
                        type="text"
                        placeholder="Nome"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInput}
                      />
                    </div>
                    <div className="form-group">
                      Você irá ao evento?{" "}
                      <input
                        name="confirmation"
                        type="checkbox"
                        id="yes"
                        checked={
                          this.state.confirmation === "yes" ? true : false
                        }
                        value="yes"
                        onChange={this.handleInput}
                      />{" "}
                      <label htmlFor="yes">Sim</label>
                      <input
                        name="confirmation"
                        type="checkbox"
                        id="no"
                        checked={
                          this.state.confirmation === "no" ? true : false
                        }
                        value="no"
                        onChange={this.handleInput}
                      />{" "}
                      <label htmlFor="no">Não</label>
                    </div>
                    <div className="form-group">
                      Quantos adultos?{" "}
                      <select
                        required
                        value={this.state.adults}
                        name="adults"
                        onChange={this.handleInput}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                      </select>
                    </div>
                    <Button disabled={loading}>
                      {loading ? "Carregando" : "Confirmar"}
                    </Button>
                  </form>
                );
              }}
            </Mutation>
          </StyledForm>
        </Col>
      </div>
    );
  }
}

const CREATE_CONFIRMATION_MUTATION = gql`
  mutation createConfirmation(
    $name: String!
    $confirmation: String!
    $adults: Int!
  ) {
    createConfirmation(
      data: { name: $name, confirmation: $confirmation, adults: $adults }
    ) {
      _id
      name
    }
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.color.text};
  font-family: "Tangerine", sans-serif;
  font-size: 2rem;
  text-align: center;

  margin: 0 0 0.15rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5em;
  }
`;

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.color.text};
  font-size: 1rem;
  font-family: "Playfair Display", sans-serif;
  font-style: italic;
  font-weight: 500;
  text-align: center;

  margin-bottom: 2rem;
`;

const StyledMap = styled.div``;

const StyledForm = styled.div`
  text-align: center;

  padding: 5rem 1rem;

  background-color: #ffffff;

  .form-group {
    margin-bottom: 0.75rem;
  }

  input,
  select {
    margin-left: 5px;
  }

  input {
    max-width: 80%;
  }

  select {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
`;
