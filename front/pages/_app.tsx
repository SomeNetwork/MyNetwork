import { Provider } from "react-redux";
import {
  AppInit,
  AuthManager,
  ToastManager,
  WithBar,
  Div100vh,
} from "components/organisms";
import "../styles/globals.scss";
import { AppProps } from "next/app";
// import { WithBar } from "components/organisms/Bar";
import { useStore } from "store";

function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Div100vh>
        <AppInit />
        <AuthManager>
          <WithBar>
            <Component {...pageProps} />
          </WithBar>
        </AuthManager>
        <ToastManager />
      </Div100vh>
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
