import React from "react";
import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";

import { withApollo } from "../lib";
import { Music } from "../components";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
          <Music />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
