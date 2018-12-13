import React, { useState } from "react";
import styled from "styled-components";

import { Page, Meta, Header, Banner, Footer, Container } from "../components";

export function Checkout() {
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

  handleCheckout = e => {
    const { name, value } = e.target;
    setCheckout({ ...checkout, [name]: value });
  };

  handleCard = e => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
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
            name="cardNumber"
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
