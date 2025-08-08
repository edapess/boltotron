import { configureStore, StoreEnhancer } from '@reduxjs/toolkit';
import rootReducer from './slices/rootReducer';
import { baseApi } from './toolkitServices';

export type RootState = ReturnType<typeof rootReducer>;

const enhancers: StoreEnhancer[] = [];
//if (__DEV__) {
//}

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware),
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(enhancers),
    preloadedState,
  });
}
const store = setupStore();
export default store;
