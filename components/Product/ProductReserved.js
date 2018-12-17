import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import { Modal, Button } from "../";

export class ProductReserved extends Component {
  state = {
    data: { name: "", tel: "", productId: this.props.productId },
    completed: false
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      data: { ...this.state.data, [name]: value }
    });
  };

  onSubmit = (e, reserved) => {
    e.preventDefault();

    const { name, tel, productId } = this.state.data;
    if (name && tel && productId) {
      reserved({ variables: { ...this.state.data } });
    }
  };

  onCompleted = () => {
    this.setState({ completed: true }, () => {
      setTimeout(() => {
        window.history.back();
      }, 2000);
    });
  };

  render() {
    const {
      data: { name, tel },
      completed
    } = this.state;
    return (
      <Modal>
        <StyledProductReserved>
          {completed ? (
            <p>
              Tudo certo! <br /> Obrigado :)
            </p>
          ) : (
            <>
              <p>
                Você pode comprar este item em uma loja física de sua
                preferência e enviar aos noivos, para isso, insira seu nome e
                telefone!
              </p>
              <Mutation
                mutation={ADD_RESERVED_MUTATION}
                onCompleted={this.onCompleted}
              >
                {(reserved, { loading }) => (
                  <form onSubmit={e => this.onSubmit(e, reserved)}>
                    <div>
                      <div>
                        <label htmlFor="name">Nome: *</label>
                        <input
                          required
                          type="text"
                          name="name"
                          placeholder="Seu nome"
                          value={name}
                          onChange={this.handleInput}
                        />
                      </div>
                      <div>
                        <label htmlFor="name">Telefone: *</label>
                        <input
                          required
                          type="tel"
                          name="tel"
                          placeholder="(00) 0 0000-0000"
                          value={tel}
                          onChange={this.handleInput}
                        />
                      </div>
                    </div>
                    <Button disabled={loading}>Reservar Produto</Button>
                  </form>
                )}
              </Mutation>
            </>
          )}
        </StyledProductReserved>
      </Modal>
    );
  }
}

const ADD_RESERVED_MUTATION = gql`
  mutation addReserved($name: String!, $tel: String!, $productId: ID!) {
    addReserved(
      data: { name: $name, tel: $tel, productId: $productId, quantity: 1 }
    ) {
      _id
      name
      tel
      product {
        _id
        name
        price
        quantity
        stock
        reserved
        active
        cart {
          _id
          quantity
        }
      }
      quantity
    }
  }
`;

const StyledProductReserved = styled.div`
  padding: 2rem 1rem;

  p {
    text-align: center;
    padding: 0 2rem;
  }

  label {
    font-size: 0.875rem;

    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 1rem;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      div {
        padding: 0 1rem;
      }
    }
  }

  button {
    text-align: center;
    margin-top: 1rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 3rem;

    form {
      > div {
        flex-direction: row;
      }
    }
  }
`;
