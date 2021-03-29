import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createMiddlewar from "redux-saga";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "store/reducers";
import rootSagas from "store/sagas";

import ToastManager from "components/organisms/managers/ToastManager";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const sagaMiddleware = createMiddlewar();
  // const store = createStore(
  //   rootReducer,
  //   applyMiddleware(logger, sagaMiddleware)
  // );
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger, sagaMiddleware))
  );

  sagaMiddleware.run(rootSagas);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastManager />
    </Provider>
  );
}

export default MyApp;
