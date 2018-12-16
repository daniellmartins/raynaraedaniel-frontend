import React, { Component } from "react";
import { withApollo, Mutation } from "react-apollo";
import gql from "graphql-tag";
import InputMask from "react-input-mask";
import { Col, Row } from "react-styled-flexboxgrid";
import styled from "styled-components";

import {
  Page,
  Meta,
  Header,
  Banner,
  Button,
  Footer,
  CART_QUERY
} from "../components";
import { formatMoney, calcTotalPrice } from "../lib";

class Checkout extends Component {
  state = {
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
    paymentMethod: "boleto",
    senderHash: "",
    cardNumber: "",
    brand: "",
    cvv: "",
    expirationMonth: "",
    expirationYear: "",
    creditCardToken: "",
    installmentQuantity: "1",
    installmentValue: "",
    noInterestInstallmentQuantity: "2",
    installments: {}
  };

  componentDidMount() {
    PagSeguroDirectPayment.onSenderHashReady(response => {
      if (response.status === "error") {
        console.log(response.message);
        return false;
      }

      this.setState({ senderHash: response.senderHash || "" });
    });
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleInstallments = e => {
    const { name, value } = e.target;
    this.setState({
      installmentQuantity: value,
      installmentValue: formatMoney(
        Object.keys(this.state.installments).map(
          installment =>
            this.state.installments[installment][value - 1].installmentAmount
        )[0],
        ",",
        "."
      )
    });
  };

  getInstallments = brand => {
    this.props.client
      .query({ query: CART_QUERY })
      .then(result => {
        PagSeguroDirectPayment.getInstallments({
          amount: formatMoney(calcTotalPrice(result.data.cart), ",", "."),
          brand,
          maxInstallmentNoInterest: 2,
          success: response => {
            this.setState({
              installments: response.installments,
              installmentValue: formatMoney(
                calcTotalPrice(result.data.cart),
                ",",
                "."
              )
            });
            console.log(response);
          },
          error: response => {
            console.log(response);
          },
          complete: response => {
            console.log(response);
          }
        });
      })
      .catch(err => console.log(err));
  };

  createCardToken = createOrder => {
    const param = {
      cardNumber: this.state.cardNumber,
      brand: this.state.brand,
      cvv: this.state.cvv,
      expirationMonth: this.state.expirationMonth,
      expirationYear: this.state.expirationYear,
      success: response => {
        //token gerado, esse deve ser usado na chamada da API do Checkout Transparente
        console.log(response);
        this.setState({ creditCardToken: response.card.token });
        const variables = {
          ...this.state,
          creditCardToken: response.card.token,
          senderCPF: this.state.senderCPF.replace(/[.-]/gi, ""),
          shippingAddressPostalCode: this.state.shippingAddressPostalCode.replace(
            /-/gi,
            ""
          )
        };

        console.log(this.state);
        createOrder({
          variables
        });
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

  getBrand = () => {
    PagSeguroDirectPayment.getBrand({
      cardBin: this.state.cardNumber.replace(/ /gi, "").slice(0, 6),
      success: response => {
        this.setState({ brand: response.brand.name });

        this.getInstallments(response.brand.name);
      },
      error: response => {
        console.log(response);
      },
      complete: response => {}
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.cardNumber !== this.state.cardNumber &&
      this.state.cardNumber.length > 6
    ) {
      this.getBrand();
      return true;
    }

    return false;
  }

  render() {
    return (
      <Page>
        <Meta />
        <Header />
        <Banner size="medium">
          <Title>Finalizar Compra</Title>
        </Banner>
        <StyledCheckout>
          <StyledContainer>
            <Mutation mutation={CREATE_ORDER_MUTATION}>
              {(createOrder, { loading, error, data }) => {
                if (loading) return <p>Carregando!</p>;
                if (error)
                  return (
                    <p>
                      Erro ao concluir compra! Por favor, tente novamente mais
                      tarde.
                    </p>
                  );
                if (data)
                  return (
                    <div>
                      <h1>Tudo certo! Obrigado ;)</h1>
                      {this.state.paymentMethod === "boleto" && (
                        <p>
                          Seu boleto:{" "}
                          <a href={data.createOrder} target="_blank">
                            Abrir boleto
                          </a>
                        </p>
                      )}
                    </div>
                  );
                return (
                  <form
                    action=""
                    onSubmit={async e => {
                      e.preventDefault();
                      if (this.state.paymentMethod === "boleto") {
                        const variables = {
                          ...this.state,
                          senderCPF: this.state.senderCPF.replace(/[.-]/gi, ""),
                          shippingAddressPostalCode: this.state.shippingAddressPostalCode.replace(
                            /-/gi,
                            ""
                          )
                        };

                        console.log(this.state);
                        createOrder({
                          variables
                        });
                      } else {
                        this.createCardToken(createOrder);
                      }
                    }}
                  >
                    <div className="personal_data block">
                      <h1>Seus Dados</h1>
                      <div className="form-group">
                        <label htmlFor="senderName">Nome: *</label>
                        <input
                          required
                          type="text"
                          id="senderName"
                          name="senderName"
                          placeholder="Ex: João Silva"
                          value={this.state.senderName}
                          onChange={this.handleInput}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="senderCPF">CPF: *</label>
                        <InputMask
                          required
                          name="senderCPF"
                          id="senderCPF"
                          mask="999.999.999-99"
                          placeholder="Ex: 000.000.000-00"
                          value={this.state.senderCPF}
                          onChange={this.handleInput}
                        >
                          {inputProps => <input {...inputProps} />}
                        </InputMask>
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">E-mail: *</label>
                        <input
                          required
                          type="email"
                          id="senderEmail"
                          name="senderEmail"
                          placeholder="Ex: joaosilva@email.com"
                          value={this.state.senderEmail}
                          onChange={this.handleInput}
                        />
                      </div>
                      <Row>
                        <Col xs={12} md={8}>
                          <div className="form-group">
                            <label htmlFor="email">Endereço: *</label>
                            <input
                              required
                              type="text"
                              id="shippingAddressStreet"
                              name="shippingAddressStreet"
                              placeholder="Ex: Rua João Silva"
                              value={this.state.shippingAddressStreet}
                              onChange={this.handleInput}
                            />
                          </div>
                        </Col>
                        <Col xs={12} md={4}>
                          <div className="form-group">
                            <label htmlFor="shippingAddressNumber">
                              Número: *
                            </label>
                            <input
                              required
                              type="text"
                              id="shippingAddressNumber"
                              name="shippingAddressNumber"
                              placeholder="Ex: 1384"
                              value={this.state.shippingAddressNumber}
                              onChange={this.handleInput}
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
                              value={this.state.shippingAddressComplement}
                              onChange={this.handleInput}
                            />
                          </div>
                        </Col>
                        <Col xs={12} md={6}>
                          <div className="form-group">
                            <label htmlFor="shippingAddressDistrict">
                              Bairro: *
                            </label>
                            <input
                              required
                              type="text"
                              id="shippingAddressDistrict"
                              name="shippingAddressDistrict"
                              placeholder="Ex: Jardim Paulistano"
                              value={this.state.shippingAddressDistrict}
                              onChange={this.handleInput}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          <div className="form-group">
                            <label htmlFor="shippingAddressPostalCode">
                              CEP: *
                            </label>
                            <InputMask
                              required
                              name="shippingAddressPostalCode"
                              id="shippingAddressPostalCode"
                              mask="99999-999"
                              placeholder="Ex: 00000-000"
                              value={this.state.shippingAddressPostalCode}
                              onChange={this.handleInput}
                            >
                              {inputProps => <input {...inputProps} />}
                            </InputMask>
                          </div>
                        </Col>
                        <Col xs={12} md={6}>
                          <div className="form-group">
                            <label htmlFor="shippingAddressCity">
                              Cidade: *
                            </label>
                            <input
                              required
                              type="text"
                              id="shippingAddressCity"
                              name="shippingAddressCity"
                              placeholder="Ex: Esperança - PB"
                              value={this.state.shippingAddressCity}
                              onChange={this.handleInput}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="form_of_payment block">
                      <h1>Forma de Pagamento</h1>
                      <select
                        value={this.state.paymentMethod}
                        name="paymentMethod"
                        onChange={this.handleInput}
                      >
                        <option value="boleto">Boleto</option>
                        <option value="creditCard">Cartão de Credito</option>
                      </select>
                    </div>

                    {this.state.paymentMethod !== "boleto" ? (
                      <div>
                        <h1>Dados do Cartão</h1>
                        <Row>
                          <Col xs={12} md={8}>
                            <div className="form-group">
                              <label htmlFor="cardNumber">Número: *</label>
                              <InputMask
                                required
                                name="cardNumber"
                                id="cardNumber"
                                mask="9999 9999 9999 9999"
                                placeholder="Ex: 0000 0000 0000 0000"
                                value={this.state.cardNumber}
                                onChange={this.handleInput}
                              >
                                {inputProps => <input {...inputProps} />}
                              </InputMask>
                            </div>
                          </Col>
                          <Col xs={12} md={4}>
                            <div className="form-group">
                              <label htmlFor="cvv">CVV: *</label>
                              <InputMask
                                required
                                name="cvv"
                                id="cvv"
                                mask="999"
                                placeholder="Ex: 000"
                                value={this.state.cvv}
                                onChange={this.handleInput}
                              >
                                {inputProps => <input {...inputProps} />}
                              </InputMask>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={4}>
                            <div className="form-group">
                              <label htmlFor="expirationMonth">
                                Mês de Validade: *
                              </label>
                              <InputMask
                                required
                                name="expirationMonth"
                                id="expirationMonth"
                                mask="99"
                                placeholder="Ex: 12"
                                value={this.state.expirationMonth}
                                onChange={this.handleInput}
                              >
                                {inputProps => <input {...inputProps} />}
                              </InputMask>
                            </div>
                          </Col>
                          <Col xs={12} md={4}>
                            <div className="form-group">
                              <label htmlFor="expirationYear">
                                Ano de Validade: *
                              </label>
                              <InputMask
                                required
                                name="expirationYear"
                                id="expirationYear"
                                mask="9999"
                                placeholder="Ex: 2022"
                                value={this.state.expirationYear}
                                onChange={this.handleInput}
                              >
                                {inputProps => <input {...inputProps} />}
                              </InputMask>
                            </div>
                          </Col>
                          <Col xs={12} md={4}>
                            <div className="form-group">
                              <label htmlFor="installments">Parcelas: *</label>
                              <select
                                value={this.state.installmentQuantity}
                                name="installments"
                                onChange={this.handleInstallments}
                              >
                                {Object.keys(this.state.installments).map(
                                  installment =>
                                    this.state.installments[installment].map(
                                      item => (
                                        <option
                                          key={item.quantity}
                                          name={formatMoney(
                                            item.installmentAmount,
                                            ",",
                                            "."
                                          )}
                                          value={item.quantity}
                                        >
                                          {item.quantity} de R${" "}
                                          {formatMoney(item.installmentAmount)}{" "}
                                          - Total R${" "}
                                          {formatMoney(item.totalAmount)}
                                        </option>
                                      )
                                    )
                                )}
                              </select>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ) : null}

                    <StyledButton>Finalizar Compra</StyledButton>
                  </form>
                );
              }}
            </Mutation>
          </StyledContainer>
        </StyledCheckout>
        <Footer />
      </Page>
    );
  }
}

export default withApollo(Checkout);

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder(
    $senderName: String!
    $senderCPF: String!
    $senderAreaCode: String!
    $senderPhone: String!
    $senderEmail: String!
    $shippingAddressStreet: String!
    $shippingAddressNumber: String!
    $shippingAddressComplement: String
    $shippingAddressDistrict: String!
    $shippingAddressPostalCode: String!
    $shippingAddressCity: String!
    $paymentMethod: String!
    $senderHash: String
    $creditCardToken: String!
    $installmentQuantity: String!
    $installmentValue: String!
    $noInterestInstallmentQuantity: String!
  ) {
    createOrder(
      data: {
        senderName: $senderName
        senderCPF: $senderCPF
        senderAreaCode: $senderAreaCode
        senderPhone: $senderPhone
        senderEmail: $senderEmail
        shippingAddressStreet: $shippingAddressStreet
        shippingAddressNumber: $shippingAddressNumber
        shippingAddressComplement: $shippingAddressComplement
        shippingAddressDistrict: $shippingAddressDistrict
        shippingAddressPostalCode: $shippingAddressPostalCode
        shippingAddressCity: $shippingAddressCity
        paymentMethod: $paymentMethod
        senderHash: $senderHash
        creditCardToken: $creditCardToken
        installmentQuantity: $installmentQuantity
        installmentValue: $installmentValue
        noInterestInstallmentQuantity: $noInterestInstallmentQuantity
      }
    )
  }
`;

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

const StyledButton = styled(Button)`
  color: #ffffff;

  width: 100%;

  background-color: ${({ theme }) => theme.color.primary};
`;
