import React from "react";
import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";

import { withApollo } from "../lib";
import { Page } from "../components";

class MyApp extends App {
  // componentDidMount() {
  //   this.handleScrollTo();
  // }

  // componentDidUpdate() {
  //   this.handleScrollTo();
  // }

  // handleScrollTo = () => {
  //   const path = `#${this.props.router.asPath.replace(/\/|-/g, "")}`;
  //   console.log(path);

  //   if (path === "#") {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   } else {
  //     document.querySelector(path).scrollIntoView({
  //       behavior: "smooth"
  //     });
  //   }
  // };

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
