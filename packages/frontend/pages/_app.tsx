import Head from "next/head";
import { useEffect } from "react";
import { Provider } from "react-redux";

import usePlayerAuth from "@lib/hooks/auth";
import { setPlayer } from "@lib/player";
import store from "@lib/store";

import type { AppProps } from "next/app";

// CSS
import "leaflet/dist/leaflet.css";
import "../styles/main.css";

const Noop: React.FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = Component.Layout || Noop;

  const { player } = usePlayerAuth("/login");
  useEffect(() => {
    store.dispatch(setPlayer({ player }));
  }, [player]);
  return (
    <Provider store={store}>
      <Head>
        <title>BMS Companion</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
