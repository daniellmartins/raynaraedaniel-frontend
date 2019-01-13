import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    let styleTags = sheet.getStyleElement();
    styleTags[0].props.dangerouslySetInnerHTML.__html = styleTags[0].props.dangerouslySetInnerHTML.__html.replace(
      /(\n)/gm,
      ""
    );
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="pt-br">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#c59bb9" />
          <meta
            name="google-site-verification"
            content={process.env.GOOGLE_SITE_VERIFICATION}
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            type="text/javascript"
            src={process.env.PAGSEGURO_SCRIPT_URL}
          />
        </body>
      </html>
    );
  }
}
