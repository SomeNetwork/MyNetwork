import { Provider } from "react-redux";

import { AuthManager, Bar, ToastManager } from "components/organisms";
import { useStore } from "store";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <AuthManager>
        <Bar />
        <Component {...pageProps} />
      </AuthManager>
      <ToastManager />
    </Provider>
  );
}

// export async function getServerSideProps(route) {
//   debugger;
//   console.log("route :>> ", route);
//   return {
//     props: {},
//   };
// }

export default MyApp;
