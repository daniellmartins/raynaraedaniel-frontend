import React from "react";
import Link from "next/link";
import { Query } from "react-apollo";
import styled, { css } from "styled-components";

import { CartItem, CART_QUERY } from "./";
import { calcTotalPrice, formatMoney } from "../../lib";

export const CartList = ({ fixed }) => (
  <StyledCartList>
    <Query query={CART_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <p>Carregando...</p>;
        if (error)
          return <p>Error! Por favor, verifique sua conexão com a internet!</p>;
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
                  {data.cart.map(cart => (
                    <CartItem key={cart._id} cart={cart} />
                  ))}
                </tbody>
              </table>
            </StyledCartListTable>
            <StyledCartFooter fixed={fixed}>
              {data.cart.length > 0 ? (
                <Link scroll href="/checkout" as="/finalizar-compra">
                  <StyledButton>Finalizar Compra</StyledButton>
                </Link>
              ) : (
                <Link scroll href="/products" as="/lista-de-presentes">
                  <StyledButton>Voltar</StyledButton>
                </Link>
              )}

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
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: flex-end;

  padding-top: 1rem;
  padding-bottom: 1rem;

  a {
    text-align: center;
    margin-top: 2rem;
    align-self: stretch;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;

    a {
      margin-top: 0;
    }
  }

  ${({ fixed }) =>
    fixed &&
    css`
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        flex-direction: row;
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;

        padding-left: 1rem;
        padding-right: 1rem;
      }
    `}

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

const StyledButton = styled.a`
  color: ${({ theme }) => theme.color.primary};
  font-size: 0.875em;

  cursor: pointer;
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
