import type { AppProps } from "next/app";
import ToastContainer from "../components/toast-container";
import Providers from "../contexts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <ToastContainer />
      <Component {...pageProps} />;
    </Providers>
  );
}

export default MyApp;
