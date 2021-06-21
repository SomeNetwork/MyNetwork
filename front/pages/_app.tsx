import { Provider } from "react-redux";
import {
  AppInit,
  AuthManager,
  ToastManager,
  WithBar,
} from "components/organisms";
import "../styles/globals.scss";
import { AppProps } from "next/app";
// import { WithBar } from "components/organisms/Bar";
import { useStore } from "store";

function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <AppInit />
      <AuthManager>
        <WithBar>
          <Component {...pageProps} />
        </WithBar>
      </AuthManager>
      <ToastManager />
    </Provider>
  );
}

// export async function getServerSideProps(route) {
//   ;
//   console.log("route :>> ", route);
//   return {
//     props: {},
//   };
// }

export default App;
