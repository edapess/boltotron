import { IBoltoConfig, IBoltotronPlugin, IBoltotronMessage } from 'src/types';
//🚀 use this in every console, please
export interface IBoltotronClient {
  configure(config: IBoltoConfig): this;
  use(plugin: IBoltotronPlugin): this;
  connect(): this;
  send(type: string, payload: any, plugin?: string): void;
  disconnect(): void;
  // Feature methods injected by plugins are dynamic
  [key: string]: any;
  isReady: boolean;
}

class BoltotronClient implements IBoltotronClient {
  private config: IBoltoConfig | null = null;
  private plugins: IBoltotronPlugin[] = [];
  private socket: WebSocket | null = null;
  isReady = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  configure(config: IBoltoConfig): this {
    this.config = config;
    return this;
  }

  use(plugin: IBoltotronPlugin): this {
    this.plugins.push(plugin);
    plugin.onRegister?.(this);

    if (plugin.features) {
      const featureMap = plugin.features(this);
      for (const [name, fn] of Object.entries(featureMap)) {
        if ((this as any)[name]) {
          console.warn(
            `🚀 Boltotron: feature "${name}" from plugin "${plugin.name}" is overriding an existing method.`
          );
        }
        (this as any)[name] = fn;
      }
    }

    return this;
  }

  connect(): this {
    if (!this.config) {
      throw new Error(
        '🚀 Boltotron: configure() must be called before connect().'
      );
    }

    if (this.socket) {
      console.warn('🚀 Boltotron: already connected — ignoring connect()');
      return this;
    }

    const { host, port, secure } = this.config;
    const protocol = secure ? 'wss' : 'ws';
    const url = `${protocol}://${host}:${port}`;

    const socket = new WebSocket(url);
    this.socket = socket;

    socket.onopen = () => {
      this.isReady = true;
      this.plugins.forEach((p) => p.onConnect?.(this));
    };
    socket.onmessage = (event) => {
      this.handleIncoming(event.data);
    };

    socket.onclose = () => {
      this.disconnect();
    };
    socket.onerror = () => {
      this.disconnect();
    };

    return this;
  }

  send(type: string, payload: any, plugin?: string): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn('🚀 Boltotron: cannot send() — socket not connected');
      return;
    }

    const message: IBoltotronMessage = {
      actionType: type,
      payload: payload,
      timestamp: Date.now(),
      source: plugin || 'unknown',
    };

    try {
      const raw = JSON.stringify(message);
      this.socket.send(raw);
    } catch (err) {
      console.error('🚀 Boltotron: failed to send message', err);
    }
  }

  private handleIncoming(raw: any): void {
    let message: IBoltotronMessage | null = null;
    try {
      message = JSON.parse(raw);
    } catch (err) {
      console.warn('🚀 Boltotron: failed to parse incoming message', err);
      return;
    }

    for (const plugin of this.plugins) {
      try {
        plugin.onMessage?.(message, this);
      } catch (err) {
        console.error(
          `🚀 Boltotron: plugin "${plugin.name}" threw in onMessage()`,
          err
        );
      }
    }
  }

  disconnect(): void {
    if (!this.socket) {
      return;
    }

    try {
      this.socket.close();
      this.isReady = false;
    } catch {
      throw new Error('🚀 Boltotron: failed to close socket');
    }

    this.socket = null;
    this.plugins.forEach((p) => p.onDisconnect?.(this));
  }
}

export const createBoltotronClient = (
  config: IBoltoConfig
): IBoltotronClient => {
  return new BoltotronClient().configure(config);
};
