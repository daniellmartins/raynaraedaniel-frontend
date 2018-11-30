import React from "react";
import { Query } from "react-apollo";
import styled from "styled-components";

import { CART_QUERY } from "./";
import { calcTotalPrice, formatMoney } from "../lib";
import { CartUpdate } from "./CartUpdate";

export const CartList = () => (
  <StyledCartList>
    <Query query={CART_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <p>loading...</p>;
        if (error) return <p>error</p>;
        return (
          <div>
            <StyledCartListTable>
              <table>
                <thead>
                  <tr>
                    <th align="left">Produto</th>
                    <th align="right">Preço</th>
                    <th align="center">Quantidade</th>
                    <th align="right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {data.cart.map(cart => {
                    const price = formatMoney(cart.product.price);
                    const total = formatMoney(
                      cart.product.price * cart.quantity
                    );
                    return (
                      <tr key={cart._id}>
                        <td align="left">{cart.product.name}</td>
                        <td align="right" width="90">
                          R$ {price}
                        </td>
                        <td align="center">
                          <StyledQuantity>
                            <CartUpdate
                              quantity={cart.quantity - 1}
                              product={cart.product}
                            >
                              -
                            </CartUpdate>
                            <span>{cart.quantity}</span>
                            <CartUpdate
                              quantity={cart.quantity + 1}
                              product={cart.product}
                            >
                              +
                            </CartUpdate>
                          </StyledQuantity>
                        </td>
                        <td align="right" width="90">
                          R$ {total}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </StyledCartListTable>
            <StyledCartFooter>
              <StyledButton>Finalizar Compra</StyledButton>
              <div>
                Total: <span>R$ {formatMoney(calcTotalPrice(data.cart))}</span>
              </div>
            </StyledCartFooter>
          </div>
        );
      }}
    </Query>
  </StyledCartList>
);

const StyledCartList = styled.div`
  position: relative;
  color: ${({ theme }) => theme.color.dark};

  overflow-x: auto;
  overflow-y: auto;
  height: 100%;
  padding-bottom: 50px;

  table {
    font-size: 0.875em;

    width: 100%;
  }

  table,
  th,
  td {
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.375rem;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding: 0.675rem;
    }
  }

  thead {
    color: #ffffff;
    background-color: ${({ theme }) => theme.color.primary};
  }

  tbody {
    tr {
      border-bottom: 1px solid ${({ theme }) => theme.color.grey};
    }
  }
`;

const StyledCartListTable = styled.div`
  height: 100%;
`;

const StyledCartFooter = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  justify-content: space-between;

  padding: 1rem;

  div {
    span {
      color: #ffffff;
      font-size: 0.875em;

      padding: 0.625em 1em;
      border-radius: 6px;
      border: 1px solid ${({ theme }) => theme.color.primary};
      background-color: ${({ theme }) => theme.color.primary};
    }
  }
`;

const StyledQuantity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin: 0 0.4em;
  }
`;

const StyledButton = styled.button`
  color: ${({ theme }) => theme.color.primary};
  font-size: 0.875em;

  padding: 0.625em 1em;

  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  background-color: #ffffff;

  &:hover {
    color: #ffffff;
    background-color: ${({ theme }) => theme.color.primary};
  }

  &:disabled {
    color: #cccccc;
    border-color: #cccccc;

    cursor: default;

    &:hover {
      color: #cccccc;
      background-color: #ffffff;
    }
  }
`;
