import type {
  Action,
  Reducer,
  Store,
  StoreCreator,
  StoreEnhancer,
} from 'redux';

let socket: WebSocket | null = null;

export const sendLog = (log: any) => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(log));
  }
};

export const createLoggerEnhancer = (wsUrl: string): StoreEnhancer => {
  socket = new WebSocket(wsUrl);

  socket.onopen = () => console.log('[LogWS] connected');
  socket.onclose = () => console.log('[LogWS] disconnected');
  socket.onerror = (e) => console.log('[LogWS] error', e);

  return (next: StoreCreator): StoreCreator => {
    return <S, A extends Action>(
      reducer: Reducer<S, A>,
      preloadedState?: unknown
    ): Store<S, A> => {
      //@ts-expect-error preloadedState type, need to fix
      const store = next(reducer, preloadedState);

      const originalDispatch = store.dispatch;
      store.dispatch = (action) => {
        sendLog({
          source: 'redux',
          actionType: action.type,
          payload: (action as any).payload,
          timestamp: Date.now(),
        });
        return originalDispatch(action);
      };

      return store;
    };
  };
};
