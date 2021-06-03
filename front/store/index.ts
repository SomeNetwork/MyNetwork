import { useMemo } from "react";
// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import createMiddlewar from "redux-saga";
import logger from "redux-logger";
import rootReducer from "./reducers";
import rootSagas from "./sagas";
import { IRootState } from "./types";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

const sagaMiddleware = createMiddlewar();
const stateExample = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, sagaMiddleware),
})
export type IStore = (typeof stateExample)


let store: IStore | undefined

function initStore(preloadedState = {} as IRootState): IStore {
  const sagaMiddleware = createMiddlewar();
  const store = configureStore({
    reducer:
      rootReducer,
    preloadedState: preloadedState,
    // composeWithDevTools(applyMiddleware(logger, sagaMiddleware))

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, sagaMiddleware),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  })
  // const store: IStore = createStore<IStore, any, any, any>(
  //   rootReducer,
  //   preloadedState,
  //   composeWithDevTools(applyMiddleware(logger, sagaMiddleware))
  // );
  sagaMiddleware.run(rootSagas);

  return store;
}

export const initializeStore = (preloadedState: IRootState): IStore => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      // ...store,
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: IRootState): IStore {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}


export const useAppDispatch = () => useDispatch<IStore["dispatch"]>()
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
