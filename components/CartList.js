import React from "react";
import { Query } from "react-apollo";
import styled from "styled-components";

import { CART_QUERY } from "./";

export const CartList = () => (
  <StyledCartList>
    <Query query={CART_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <p>loading...</p>;
        if (error) return <p>error</p>;
        return (
          <table>
            <thead>
              <tr>
                <th align="left">Produto</th>
                <th align="right">Preço</th>
                <th align="center">Quantidade</th>
                <th align="right">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.cart.map(cart => {
                const price = cart.product.price.toFixed(2).replace(".", ",");
                const total = (cart.product.price * cart.quantity)
                  .toFixed(2)
                  .replace(".", ",");
                return (
                  <tr key={cart._id}>
                    <td align="left">{cart.product.name}</td>
                    <td align="right">{price}</td>
                    <td align="center">{cart.quantity}</td>
                    <td align="right">{total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      }}
    </Query>
  </StyledCartList>
);

const StyledCartList = styled.div`
  color: ${({ theme }) => theme.color.dark};

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
    padding: 5px;
  }

  tbody {
    tr {
      border-bottom: 1px solid black;
    }
  }
`;
