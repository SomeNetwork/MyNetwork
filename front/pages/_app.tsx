import { Provider } from "react-redux";
import { AuthManager, ToastManager } from "components/organisms";
import { useStore } from "store";
import "../styles/globals.scss";
import { AppProps } from "next/app";
import { WithBar } from "components/organisms/Bar";

function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
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
