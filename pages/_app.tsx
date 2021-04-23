import React from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {AppProps} from "next/app";
import Head from "next/head";

export default function App({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>plsroast.me</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
