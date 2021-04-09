import React from "react";
import { MuiThemeProvider, Box } from "@material-ui/core";
import Head from "next/head";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Header } from "../components/layout";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    // @ts-ignore
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      // @ts-ignore
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Detec</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <div>
        <Header />
        <Component {...pageProps} />
      </div>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
