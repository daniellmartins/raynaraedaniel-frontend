import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

class MyCartList extends Component {
  componentDidMount() {
    this.props.subscribeToMore();
  }

  render() {
    const { loading, error, data } = this.props;
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
  }
}

export const CartList = () => (
  <StyledCartList>
    <Query query={CART_QUERY}>
      {({ subscribeToMore, ...rest }) => (
        <MyCartList
          {...rest}
          subscribeToMore={() => {
            subscribeToMore({
              document: CART_SUBSCRIPTION,
              onError: error => console.log(error),
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const { mutation, node } = subscriptionData.data.cart;
                let cart;

                switch (mutation) {
                  case "CREATED":
                    cart = [node, ...prev.cart];
                    break;
                  case "UPDATED":
                    cart = [
                      node,
                      ...prev.cart.filter(cart => cart._id !== node._id)
                    ];
                    break;
                  case "DELETED":
                    cart = prev.cart.filter(cart => cart._id !== node._id);
                    break;
                  default:
                    break;
                }

                return {
                  ...prev,
                  cart
                };
              }
            });
          }}
        />
      )}
    </Query>
  </StyledCartList>
);

const CART_TYPE = `
  _id
  product {
    _id
    name
    price
    quantity
  }
  quantity
`;

export const CART_QUERY = gql`
  {
    cart {
      ${CART_TYPE}
    }
  }
`;

export const CART_SUBSCRIPTION = gql`
  subscription {
    cart {
      mutation
      node {
      ${CART_TYPE}
    }
    
    }
}
`;

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
