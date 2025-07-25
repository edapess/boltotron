import store, { setupStore } from '../../store/configureStore';

export type TApplicationState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
