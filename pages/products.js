import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { SignIn } from "../components";
import { checkLoggedIn } from "../lib";

const PRODUCTS_QUERY = gql`
  {
    products {
      id
      name
      description
      price
      quantity
      photoUrl
      active
      createdAt
      updatedAt
    }
  }
`;

const Products = ({ me }) => {
  if (!me) return <SignIn />;
  return (
    <Query query={PRODUCTS_QUERY} fetchPolicy="network-only">
      {({ loading, error, data }) => {
        if (loading) return <p>loading...</p>;
        if (error) return <p>error</p>;
        return (
          <ul>
            {data.products.map(product => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

Products.getInitialProps = async ({ apolloClient }) => {
  const { me } = await checkLoggedIn(apolloClient);
  return { ...me };
};

export default Products;
