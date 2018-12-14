import React, { useState } from "react";
import styled from "styled-components";

import { Page, Meta, Header, Banner, Footer, Container } from "../components";

export default function Checkout() {
  const [checkout, setCheckout] = useState({
    formOfPayment: "ticket", // ticket, creditCard and debitCard
    senderHash: ""
  });

  const [card, setCard] = useState({
    number: "",
    brand: "",
    cvv: "",
    expirationMonth: "",
    expirationYear: ""
  });

  const handleCheckout = e => {
    const { name, value } = e.target;
    setCheckout({ ...checkout, [name]: value });
  };

  const handleCard = e => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  };

  const onSenderHashReady = () => {
    PagSeguroDirectPayment.onSenderHashReady(response => {
      if (response.status === "error") {
        console.log(response.message);
        return false;
      }

      setCheckout({ ...checkout, senderHash: response.senderHash || "" });
    });
  };

  const getPaymentMethods = () => {
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

  const createCardToken = () => {
    const param = {
      ...card,
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

  return (
    <Page>
      <Meta />
      <Header />
      <Banner size="small" />
      <StyledCheckout>
        <StyledContainer>
          <div>
            <h1>1. Forma de Pagamento</h1>
            <ul>
              <li>
                <input
                  type="checkbox"
                  name="formOfPayment"
                  checked={checkout.formOfPayment === "ticket"}
                  onChange={handleCheckout}
                />
                Boleto
              </li>
            </ul>
          </div>
          <input
            placeholder="cardNumber"
            name="number"
            value={card.number}
            onChange={handleCard}
          />
          <input
            placeholder="cvv"
            name="cvv"
            value={card.cvv}
            onChange={handleCard}
          />
          <br />
          <input
            placeholder="brand"
            name="brand"
            value={card.brand}
            onChange={handleCard}
          />
          <br />
          <input
            placeholder="expirationMonth"
            name="expirationMonth"
            value={card.expirationMonth}
            onChange={handleCard}
          />
          <br />
          <input
            placeholder="expirationYear"
            name="expirationYear"
            value={card.expirationYear}
            onChange={handleCard}
          />

          <button onClick={onSenderHashReady}>UserID</button>
          <button onClick={getPaymentMethods}>PaymentMethods</button>
          <button onClick={createCardToken}>CardToken</button>
        </StyledContainer>
      </StyledCheckout>
      <Footer />
    </Page>
  );
}

const StyledCheckout = styled.div`
  background-color: #ffffff;
  animation: banner-small 0.25s forwards;

  padding: 3rem 0;
`;

const StyledContainer = styled(Container)`
  max-width: 600px;
`;
