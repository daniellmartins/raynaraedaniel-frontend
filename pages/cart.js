import React, { Component } from "react";
import styled from "styled-components";

import { Container, CartList } from "../components";

export default class Cart extends Component {
  state = {
    senderHash: "",
    card: {
      cardNumber: "",
      brand: "",
      cvv: "",
      expirationMonth: "",
      expirationYear: ""
    }
  };

  componentDidMount() {
    PagSeguroDirectPayment.setSessionId("e3530d0253864755819c89946b04e841");
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ card: { ...this.state.card, [name]: value } });
  };

  onSenderHashReady = () => {
    PagSeguroDirectPayment.onSenderHashReady(response => {
      if (response.status === "error") {
        console.log(response.message);
        return false;
      }

      this.setState({ senderHash: response.senderHash || "" });
    });
  };

  getPaymentMethods = () => {
    PagSeguroDirectPayment.getPaymentMethods({
      amount: 500.0,
      success: response => {
        //meios de pagamento disponíveis
        console.log(response.paymentMethods);
      },
      error: response => {
        if (response.error) {
          console.log(response);
        }
      },
      complete: response => {
        //tratamento comum para todas chamadas
      }
    });
  };

  createCardToken = () => {
    const param = {
      ...this.state.card,
      success: response => {
        //token gerado, esse deve ser usado na chamada da API do Checkout Transparente
        console.log(response);
      },
      error: response => {
        //tratamento do erro
        console.log(response);
      },
      complete: response => {
        //tratamento comum para todas chamadas
        console.log(response);
      }
    };
    PagSeguroDirectPayment.createCardToken(param);
  };

  render() {
    const { card } = this.state;
    console.log(this.state);
    return (
      <StyledContainer>
        <h1>Carrinho</h1>
        <CartList />
        <input
          type="text"
          placeholder="cardNumber"
          name="cardNumber"
          value={card.cardNumber}
          onChange={this.handleInput}
        />
        <input
          type="text"
          placeholder="cvv"
          name="cvv"
          value={card.cvv}
          onChange={this.handleInput}
        />
        <br />
        <input
          type="text"
          placeholder="brand"
          name="brand"
          value={card.brand}
          onChange={this.handleInput}
        />
        <br />
        <input
          type="text"
          placeholder="expirationMonth"
          name="expirationMonth"
          value={card.expirationMonth}
          onChange={this.handleInput}
        />
        <br />
        <input
          type="text"
          placeholder="expirationYear"
          name="expirationYear"
          value={card.expirationYear}
          onChange={this.handleInput}
        />

        <button onClick={this.onSenderHashReady}>UserID</button>
        <button onClick={this.getPaymentMethods}>PaymentMethods</button>
        <button onClick={this.createCardToken}>CardToken</button>
        <script
          type="text/javascript"
          src="https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js"
        />
      </StyledContainer>
    );
  }
}

const StyledContainer = styled(Container)`
  max-width: 600px;
`;
