import React from "react";
import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import Router from "next/router";

import { withApollo } from "../lib";
import { Page } from "../components";

class MyApp extends App {
  state = { loading: true };

  componentDidMount() {
    this.handleScrollTo();

    Router.events.on("routeChangeStart", url => {
      this.setState({ loading: true });
    });
    Router.events.on("routeChangeComplete", () =>
      setTimeout(this.handleScrollTo(), 500)
    );
    Router.events.on("routeChangeError", () =>
      setTimeout(this.handleScrollTo(), 500)
    );
  }

  componentWillUnmount() {
    Router.events.off("routeChangeStart", () => {});
    Router.events.off("routeChangeComplete", () => {});
    Router.events.off("routeChangeError", () => {});
  }

  handleScrollTo = () => {
    const { asPath } = this.props.router;
    let id;

    this.setState({ loading: false });

    switch (asPath) {
      case "/padrinhos-e-madrinhas":
        id = "#friends";
        break;
      case "/nossa-galeria":
        id = "#gallery";
        break;
      case "/nossa-historia":
        id = "#history";
        break;
      default:
        id = "body";
        break;
    }

    if (id === "body") {
      return window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const top = document.querySelector(id).offsetTop - 100;
      return window.scrollTo({ top, behavior: "smooth" });
    }
  };

  render() {
    const { loading } = this.state;
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Page loading={loading}>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
