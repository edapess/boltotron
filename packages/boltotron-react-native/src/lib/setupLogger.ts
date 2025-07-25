// React Native WebSocket should be available globally
let socket: WebSocket | null = null;

export const initRemoteLogger = (wsUrl: string) => {
  // Check if WebSocket is available (React Native should have it globally)
  if (typeof WebSocket === 'undefined') {
    console.warn(
      '[RemoteLogger] WebSocket is not available in this environment'
    );
    return;
  }

  socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    console.info('[RemoteLogger] Connected to', wsUrl);
  };

  socket.onerror = (e) => {
    console.warn('[RemoteLogger] Socket error', e);
  };

  const original = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
  };

  const wrap = (level: keyof typeof original) => {
    return (...args: unknown[]) => {
      // Call original console first
      original[level](...args);

      try {
        const payload = {
          source: 'console',
          level,
          message: args
            .map((a) => (typeof a === 'string' ? a : JSON.stringify(a)))
            .join(' '),
          timestamp: Date.now(),
        };

        if (socket?.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(payload));
        }
      } catch (e) {
        original.warn('[RemoteLogger] Failed to send log', e);
      }
    };
  };

  console.log = wrap('log');
  console.warn = wrap('warn');
  console.error = wrap('error');
  console.info = wrap('info');
};
