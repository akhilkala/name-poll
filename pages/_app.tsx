import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastProvider } from "react-toast-notifications";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={2500}
      placement="bottom-right"
    >
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;
