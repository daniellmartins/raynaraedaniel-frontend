import React from "react";
import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";

import withApollo from "../lib/withApollo";
import { Page } from "../components";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
