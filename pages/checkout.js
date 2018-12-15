import React, { useState } from "react";
import InputMask from "react-input-mask";
import { Col, Row } from "react-styled-flexboxgrid";
import styled from "styled-components";

import { Page, Meta, Header, Banner, Button, Footer } from "../components";

export default function Checkout() {
  const [personalData, setPersonalData] = useState({
    senderName: "",
    senderCPF: "",
    senderAreaCode: "",
    senderPhone: "",
    senderEmail: "",
    shippingAddressStreet: "",
    shippingAddressNumber: "",
    shippingAddressComplement: "",
    shippingAddressDistrict: "",
    shippingAddressPostalCode: "",
    shippingAddressCity: "",
    shippingAddressState: "",
    shippingAddressCountry: ""
  });

  const [checkout, setCheckout] = useState({
    formOfPayment: "BOLETO", // BOLETO, ONLINE_DEBIT and CREDIT_CARD
    senderHash: ""
  });

  const [card, setCard] = useState({
    cardNumber: "",
    brand: "",
    cvv: "",
    expirationMonth: "",
    expirationYear: ""
  });

  // componentDidMount() {
  //   PagSeguroDirectPayment.setSessionId("e3530d0253864755819c89946b04e841");
  // }

  const handlePersonalData = e => {
    const { name, value } = e.target;
    setPersonalData({ ...personalData, [name]: value });
  };

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
      <Banner size="medium">
        <Title>Finalizar Compra</Title>
      </Banner>
      <StyledCheckout>
        <StyledContainer>
          <div className="personal_data block">
            <h1>Seus Dados</h1>
            <div className="form-group">
              <label htmlFor="senderName">Nome: *</label>
              <input
                type="text"
                id="senderName"
                name="senderName"
                placeholder="Ex: João Silva"
                value={personalData.senderName}
                onChange={handlePersonalData}
              />
            </div>
            <div className="form-group">
              <label htmlFor="senderCPF">CPF: *</label>
              <InputMask
                name="senderCPF"
                id="senderCPF"
                mask="999.999.999-99"
                placeholder="Ex: 000.000.000-00"
                value={personalData.senderCPF}
                onChange={handlePersonalData}
              >
                {inputProps => <input {...inputProps} disableUnderline />}
              </InputMask>
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail: *</label>
              <input
                type="email"
                id="senderEmail"
                name="senderEmail"
                placeholder="Ex: joaosilva@email.com"
                value={personalData.senderEmail}
                onChange={handlePersonalData}
              />
            </div>
            <Row>
              <Col xs={12} md={8}>
                <div className="form-group">
                  <label htmlFor="email">Endereço: *</label>
                  <input
                    type="text"
                    id="shippingAddressStreet"
                    name="shippingAddressStreet"
                    placeholder="Ex: Rua João Silva"
                    value={personalData.shippingAddressStreet}
                    onChange={handlePersonalData}
                  />
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="shippingAddressNumber">Número: *</label>
                  <input
                    type="text"
                    id="shippingAddressNumber"
                    name="shippingAddressNumber"
                    placeholder="Ex: 1384"
                    value={personalData.shippingAddressNumber}
                    onChange={handlePersonalData}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <div className="form-group">
                  <label htmlFor="shippingAddressComplement">
                    Complemento:
                  </label>
                  <input
                    type="text"
                    id="shippingAddressComplement"
                    name="shippingAddressComplement"
                    placeholder="Ex: 5º andar"
                    value={personalData.shippingAddressComplement}
                    onChange={handlePersonalData}
                  />
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="form-group">
                  <label htmlFor="shippingAddressDistrict">Bairro: *</label>
                  <input
                    type="text"
                    id="shippingAddressDistrict"
                    name="shippingAddressDistrict"
                    placeholder="Ex: Jardim Paulistano"
                    value={personalData.shippingAddressDistrict}
                    onChange={handlePersonalData}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <div className="form-group">
                  <label htmlFor="shippingAddressPostalCode">CEP: *</label>
                  <input
                    type="text"
                    id="shippingAddressPostalCode"
                    name="shippingAddressPostalCode"
                    placeholder="Ex: 00000-000"
                    value={personalData.shippingAddressPostalCode}
                    onChange={handlePersonalData}
                  />
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="form-group">
                  <label htmlFor="shippingAddressCity">Cidade: *</label>
                  <input
                    type="text"
                    id="shippingAddressCity"
                    name="shippingAddressCity"
                    placeholder="Ex: Esperança - PB"
                    value={personalData.shippingAddressCity}
                    onChange={handlePersonalData}
                  />
                </div>
              </Col>
            </Row>
          </div>

          <div className="form_of_payment block">
            <h1>Forma de Pagamento</h1>
            <select
              value={checkout.formOfPayment}
              name="formOfPayment"
              onChange={handleCheckout}
            >
              <option value="BOLETO">Boleto</option>
              <option value="ONLINE_DEBIT">Cartão de Débito</option>
              <option value="CREDIT_CARD">Cartão de Credito</option>
            </select>
          </div>

          {checkout.formOfPayment !== "BOLETO" ? (
            <div>
              <h1>Dados do Cartão</h1>
              <Row>
                <Col xs={12} md={8}>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Número: *</label>
                    <InputMask
                      name="cardNumber"
                      id="cardNumber"
                      mask="9999 9999 9999 9999"
                      placeholder="Ex: 0000 0000 0000 0000"
                      value={card.cardNumber}
                      onChange={handleCard}
                    >
                      {inputProps => <input {...inputProps} disableUnderline />}
                    </InputMask>
                  </div>
                </Col>
                <Col xs={12} md={4}>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV: *</label>
                    <InputMask
                      name="cvv"
                      id="cvv"
                      mask="999"
                      placeholder="Ex: 000"
                      value={card.cvv}
                      onChange={handleCard}
                    >
                      {inputProps => <input {...inputProps} disableUnderline />}
                    </InputMask>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <div className="form-group">
                    <label htmlFor="expirationMonth">Mês de Validade: *</label>
                    <InputMask
                      name="expirationMonth"
                      id="expirationMonth"
                      mask="99"
                      placeholder="Ex: 00"
                      value={card.expirationMonth}
                      onChange={handleCard}
                    >
                      {inputProps => <input {...inputProps} disableUnderline />}
                    </InputMask>
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="form-group">
                    <label htmlFor="expirationYear">Ano de Validade: *</label>
                    <InputMask
                      name="expirationYear"
                      id="expirationYear"
                      mask="99"
                      placeholder="Ex: 00"
                      value={card.expirationYear}
                      onChange={handleCard}
                    >
                      {inputProps => <input {...inputProps} disableUnderline />}
                    </InputMask>
                  </div>
                </Col>
              </Row>
            </div>
          ) : null}

          {/* <button onClick={onSenderHashReady}>UserID</button>
          <button onClick={getPaymentMethods}>PaymentMethods</button>
          <button onClick={createCardToken}>CardToken</button> */}

          <Button>Finalizar Compra</Button>
        </StyledContainer>
      </StyledCheckout>
      <Footer />
    </Page>
  );
}

const Title = styled.h1`
  color: #ffffff;
  font-family: "Tangerine", sans-serif;
  font-size: 2.5em;

  padding-top: 80px;
  margin: 2rem 0 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.5em;
  }
`;

const StyledCheckout = styled.div`
  background-color: #ffffff;
  animation: banner-medium 0.25s forwards;

  padding: 3rem 0;

  h1 {
    font-size: 1.5rem;
    margin: 0 0 0.875rem 0;
  }

  input,
  select {
    width: 100%;
    margin: 0 0 1rem 0;
  }

  label {
    display: block;
  }

  .block {
    margin-bottom: 2rem;
  }
`;

const StyledContainer = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
`;
