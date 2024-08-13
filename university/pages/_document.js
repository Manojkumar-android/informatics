import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import Script from "next/script";
import React, { useEffect } from "react";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/assets/icons/short_logo.png" />

          <meta charSet="UTF-8" />

        </Head>

        <body data-layout="detached" data-topbar="colored" style={{ 'margin': '0px' }}>
          <Main />
          <NextScript />

        </body>
      </Html>
    );
  }
}

export default MyDocument;
