import React from "react";
import styled from "styled-components";

import { formatMoney } from "../../lib";
import { CartUpdate } from "./CartUpdate";

export const CartItem = ({ cart }) => {
  const price = formatMoney(cart.product.price);
  const total = formatMoney(cart.product.price * cart.quantity);
  return (
    <tr key={cart._id}>
      <td align="left">{cart.product.name}</td>
      <td align="right" width="90">
        R$ {price}
      </td>
      <td align="center">
        <StyledQuantity>
          <CartUpdate quantity={cart.quantity - 1} product={cart.product}>
            -
          </CartUpdate>
          <span>{cart.quantity}</span>
          <CartUpdate quantity={cart.quantity + 1} product={cart.product}>
            +
          </CartUpdate>
        </StyledQuantity>
      </td>
      <td align="right" width="90">
        R$ {total}
      </td>
    </tr>
  );
};

const StyledQuantity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin: 0 0.4em;
  }
`;
