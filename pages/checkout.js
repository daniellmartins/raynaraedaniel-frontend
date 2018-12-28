import React, { Component } from "react";
import Link from "next/link";
import { withApollo, Mutation, Query } from "react-apollo";
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
  Cart,
  CART_QUERY
} from "../components";
import { checkLoggedIn, redirect, formatMoney, calcTotalPrice } from "../lib";

class Checkout extends Component {
  static async getInitialProps({ apolloClient }) {
    const { me } = await checkLoggedIn(apolloClient);
    if (!me) {
      redirect(context, "/products");
    }
    return { ...me };
  }

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
    shippingAddressState: "PB",
    paymentMethod: "boleto",
    senderHash: "",
    cardNumber: "",
    brand: "",
    cvv: "",
    expirationMonth: "",
    expirationYear: "",
    creditCardToken: "",
    creditCardHolderBirthDate: "",
    creditCardHolderName: "",
    creditCardHolderCPF: "",
    creditCardHolderAreaCode: "83",
    creditCardHolderPhone: "",
    installmentQuantity: "1",
    installmentValue: "",
    noInterestInstallmentQuantity: "2",
    installments: {}
  };

  componentDidMount() {
    PagSeguroDirectPayment.onSenderHashReady(response => {
      if (response && response.status && response.status === "error") {
        console.log(response);
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
      cardNumber: this.state.cardNumber.replace(/ /g, ""),
      brand: this.state.brand,
      cvv: this.state.cvv,
      expirationMonth: this.state.expirationMonth,
      expirationYear: this.state.expirationYear,
      success: response => {
        //token gerado, esse deve ser usado na chamada da API do Checkout Transparente
        console.log(response);
        this.setState({ creditCardToken: response.card.token });
        const variables = {
          senderName: this.state.senderName,
          senderAreaCode: this.state.senderAreaCode,
          senderPhone: this.state.senderPhone,
          senderEmail: this.state.senderEmail,
          shippingAddressStreet: this.state.shippingAddressStreet,
          shippingAddressNumber: this.state.shippingAddressNumber,
          shippingAddressComplement: this.state.shippingAddressComplement,
          shippingAddressDistrict: this.state.shippingAddressDistrict,
          shippingAddressCity: this.state.shippingAddressCity,
          shippingAddressState: this.state.shippingAddressState,
          paymentMethod: this.state.paymentMethod,
          senderHash: this.state.senderHash,
          installmentQuantity: this.state.installmentQuantity,
          installmentValue: this.state.installmentValue,
          noInterestInstallmentQuantity: this.state
            .noInterestInstallmentQuantity,
          creditCardToken: response.card.token,
          creditCardHolderBirthDate: this.state.creditCardHolderBirthDate,
          creditCardHolderName: this.state.creditCardHolderName.toLocaleUpperCase(),
          creditCardHolderCPF: this.state.creditCardHolderCPF.replace(
            /[.-]/gi,
            ""
          ),
          creditCardHolderAreaCode: this.state.creditCardHolderAreaCode,
          creditCardHolderPhone: this.state.creditCardHolderPhone,
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
      cardBin: this.state.cardNumber.replace(/ /g, "").slice(0, 6),
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

  onCompleted = data => {
    console.log(data);
  };

  render() {
    return (
      <Query query={CART_QUERY} ssr={false}>
        {cartQuery => {
          if (!cartQuery.loading && cartQuery.error) {
            window.location.replace("/lista-de-presentes");
            return null;
          }

          return (
            <Page>
              <Meta title="Finalizar Compra" />
              <Header />
              <Banner size="medium">
                <Title>Finalizar Compra</Title>
              </Banner>
              {this.props.me && <Cart hidden />}
              <StyledCheckout>
                <StyledContainer>
                  <Mutation
                    mutation={CREATE_ORDER_MUTATION}
                    onCompleted={this.onCompleted}
                  >
                    {(createOrder, { loading, error, data }) => {
                      if (loading || cartQuery.loading)
                        return <p>Carregando!</p>;
                      if (error || cartQuery.error || !cartQuery.data)
                        return (
                          <p>
                            Erro ao concluir compra! Por favor, tente novamente
                            mais tarde.
                          </p>
                        );

                      if (loading) return <p>Carregando...</p>;
                      if (data) {
                        return (
                          <div>
                            <h1>Tudo certo! Obrigado ;)</h1>
                            <p>
                              Pedido em análise, em breve você receberá um
                              e-mail confirmando!
                            </p>
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
                      }

                      if (cartQuery.data.cart.length === 0) {
                        return (
                          <div>
                            <h1>Você ainda não escolheu um presente</h1>
                            {this.state.paymentMethod === "boleto" && (
                              <p>
                                <Link href="/products" as="/lista-de-presentes">
                                  <a>Escolher um presente</a>
                                </Link>
                              </p>
                            )}
                          </div>
                        );
                      }
                      return (
                        <form
                          action=""
                          onSubmit={async e => {
                            e.preventDefault();
                            if (this.state.paymentMethod === "boleto") {
                              const variables = {
                                senderName: this.state.senderName,
                                senderAreaCode: this.state.senderAreaCode,
                                senderPhone: this.state.senderPhone,
                                senderEmail: this.state.senderEmail,
                                shippingAddressStreet: this.state
                                  .shippingAddressStreet,
                                shippingAddressNumber: this.state
                                  .shippingAddressNumber,
                                shippingAddressComplement: this.state
                                  .shippingAddressComplement,
                                shippingAddressDistrict: this.state
                                  .shippingAddressDistrict,
                                shippingAddressCity: this.state
                                  .shippingAddressCity,
                                shippingAddressState: this.state
                                  .shippingAddressState,
                                paymentMethod: this.state.paymentMethod,
                                senderHash: this.state.senderHash,
                                creditCardToken: this.state.creditCardToken,
                                creditCardHolderBirthDate: this.state
                                  .creditCardHolderBirthDate,
                                installmentQuantity: this.state
                                  .installmentQuantity,
                                installmentValue: this.state.installmentValue,
                                noInterestInstallmentQuantity: this.state
                                  .noInterestInstallmentQuantity,
                                senderCPF: this.state.senderCPF.replace(
                                  /[.-]/gi,
                                  ""
                                ),
                                shippingAddressPostalCode: this.state.shippingAddressPostalCode.replace(
                                  /-/gi,
                                  ""
                                )
                              };

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
                              <Col xs={4}>
                                <div className="form-group">
                                  <label htmlFor="senderAreaCode">DDD: *</label>
                                  <InputMask
                                    required
                                    name="senderAreaCode"
                                    id="senderAreaCode"
                                    mask="99"
                                    placeholder="Ex: 83"
                                    value={this.state.senderAreaCode}
                                    onChange={this.handleInput}
                                  >
                                    {inputProps => <input {...inputProps} />}
                                  </InputMask>
                                </div>
                              </Col>
                              <Col xs={8}>
                                <div className="form-group">
                                  <label htmlFor="senderPhone">
                                    Telefone: *
                                  </label>
                                  <InputMask
                                    required
                                    name="senderPhone"
                                    id="senderPhone"
                                    mask="999999999"
                                    placeholder="Ex: 000000000"
                                    value={this.state.senderPhone}
                                    onChange={this.handleInput}
                                  >
                                    {inputProps => <input {...inputProps} />}
                                  </InputMask>
                                </div>
                              </Col>
                            </Row>
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
                                    Complemento: *
                                  </label>
                                  <input
                                    required
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
                              <Col xs={12} md={4}>
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
                              <Col xs={12} md={4}>
                                <div className="form-group">
                                  <label htmlFor="shippingAddressCity">
                                    Cidade: *
                                  </label>
                                  <input
                                    required
                                    type="text"
                                    id="shippingAddressCity"
                                    name="shippingAddressCity"
                                    placeholder="Ex: Esperança"
                                    value={this.state.shippingAddressCity}
                                    onChange={this.handleInput}
                                  />
                                </div>
                              </Col>
                              <Col xs={12} md={4}>
                                <div className="form-group">
                                  <label htmlFor="shippingAddressCity">
                                    Estado: *
                                  </label>
                                  <select
                                    value={this.state.shippingAddressState}
                                    name="shippingAddressState"
                                    onChange={this.handleInput}
                                  >
                                    <option value="AC">AC</option>
                                    <option value="AL">AL</option>
                                    <option value="AP">AP</option>
                                    <option value="AM">AM</option>
                                    <option value="BA">BA</option>
                                    <option value="CE">CE</option>
                                    <option value="DF">DF</option>
                                    <option value="ES">ES</option>
                                    <option value="GO">GO</option>
                                    <option value="MA">MA</option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="PB">PB</option>
                                    <option value="PR">PR</option>
                                    <option value="PE">PE</option>
                                    <option value="PI">PI</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RN">RN</option>
                                    <option value="RS">RS</option>
                                    <option value="RO">RO</option>
                                    <option value="RR">RR</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                    <option value="SE">SE</option>
                                    <option value="TO">TO</option>
                                  </select>
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
                              <option value="creditCard">
                                Cartão de Credito
                              </option>
                            </select>
                          </div>

                          {this.state.paymentMethod !== "boleto" ? (
                            <div>
                              <h1>Dados do Cartão</h1>
                              <Row>
                                <Col xs={12}>
                                  <div className="form-group">
                                    <label htmlFor="creditCardHolderName">
                                      Titular do Cartão (igual no cartão): *
                                    </label>
                                    <input
                                      required
                                      type="text"
                                      id="creditCardHolderName"
                                      name="creditCardHolderName"
                                      placeholder="Ex: JOAO SILVA"
                                      style={{ textTransform: "uppercase" }}
                                      value={this.state.creditCardHolderName}
                                      onChange={this.handleInput}
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={12}>
                                  <div className="form-group">
                                    <label htmlFor="creditCardHolderCPF">
                                      CPF Titular do Cartão: *
                                    </label>
                                    <InputMask
                                      required
                                      name="creditCardHolderCPF"
                                      id="creditCardHolderCPF"
                                      mask="999.999.999-99"
                                      placeholder="Ex: 000.000.000-00"
                                      value={this.state.creditCardHolderCPF}
                                      onChange={this.handleInput}
                                    >
                                      {inputProps => <input {...inputProps} />}
                                    </InputMask>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={12}>
                                  <div className="form-group">
                                    <label htmlFor="creditCardHolderBirthDate">
                                      Data de Nascimento do Titular do Cartão: *
                                    </label>
                                    <InputMask
                                      required
                                      name="creditCardHolderBirthDate"
                                      id="creditCardHolderBirthDate"
                                      mask="99/99/9999"
                                      placeholder="Ex: 10/12/1990"
                                      value={
                                        this.state.creditCardHolderBirthDate
                                      }
                                      onChange={this.handleInput}
                                    >
                                      {inputProps => <input {...inputProps} />}
                                    </InputMask>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={4}>
                                  <div className="form-group">
                                    <label htmlFor="creditCardHolderAreaCode">
                                      DDD: *
                                    </label>
                                    <InputMask
                                      required
                                      name="creditCardHolderAreaCode"
                                      id="creditCardHolderAreaCode"
                                      mask="99"
                                      placeholder="Ex: 83"
                                      value={
                                        this.state.creditCardHolderAreaCode
                                      }
                                      onChange={this.handleInput}
                                    >
                                      {inputProps => <input {...inputProps} />}
                                    </InputMask>
                                  </div>
                                </Col>
                                <Col xs={8}>
                                  <div className="form-group">
                                    <label htmlFor="creditCardHolderPhone">
                                      Telefone do Titular do Cartão: *
                                    </label>
                                    <InputMask
                                      required
                                      name="creditCardHolderPhone"
                                      id="creditCardHolderPhone"
                                      mask="999999999"
                                      placeholder="Ex: 000000000"
                                      value={this.state.creditCardHolderPhone}
                                      onChange={this.handleInput}
                                    >
                                      {inputProps => <input {...inputProps} />}
                                    </InputMask>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={12} md={8}>
                                  <div className="form-group">
                                    <label htmlFor="cardNumber">
                                      Número do Cartão: *
                                    </label>
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
                                    <label htmlFor="installments">
                                      Parcelas: *
                                    </label>
                                    <select
                                      value={this.state.installmentQuantity}
                                      name="installments"
                                      onChange={this.handleInstallments}
                                    >
                                      {Object.keys(this.state.installments).map(
                                        installment =>
                                          this.state.installments[
                                            installment
                                          ].map(item => (
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
                                              {formatMoney(
                                                item.installmentAmount
                                              )}{" "}
                                              - Total R${" "}
                                              {formatMoney(item.totalAmount)}
                                            </option>
                                          ))
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
        }}
      </Query>
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
    $shippingAddressState: String!
    $paymentMethod: String!
    $senderHash: String
    $creditCardToken: String!
    $creditCardHolderBirthDate: String
    $creditCardHolderName: String
    $creditCardHolderCPF: String
    $creditCardHolderAreaCode: String
    $creditCardHolderPhone: String
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
        shippingAddressState: $shippingAddressState
        paymentMethod: $paymentMethod
        senderHash: $senderHash
        creditCardToken: $creditCardToken
        creditCardHolderBirthDate: $creditCardHolderBirthDate
        creditCardHolderName: $creditCardHolderName
        creditCardHolderCPF: $creditCardHolderCPF
        creditCardHolderAreaCode: $creditCardHolderAreaCode
        creditCardHolderPhone: $creditCardHolderPhone
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
  margin-bottom: -50vh;
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
