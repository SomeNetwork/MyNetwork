import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createMiddlewar from "redux-saga";
import logger from "redux-logger";
import rootReducer from "store/reducers";
import { watchSignIn } from "store/sagas";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const sagaMiddleware = createMiddlewar();
  const store = createStore(
    rootReducer,
    applyMiddleware(logger, sagaMiddleware)
  );

  sagaMiddleware.run(watchSignIn);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
