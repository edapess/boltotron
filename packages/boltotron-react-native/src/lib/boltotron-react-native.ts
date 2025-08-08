import {
  IBoltotronPlugin,
  IBoltotronClient,
  createBoltotronClient,
  EPluginNames,
} from '@boltotron/boltotron-core';

type ConsoleMethod = 'log' | 'warn' | 'error' | 'info' | 'debug';
const DEFAULT_CONFIG = {
  host: '127.0.0.1',
  port: 7878,
};
const boltotron = createBoltotronClient(DEFAULT_CONFIG);

export function useReactNative(): IBoltotronPlugin {
  const originalConsole: Partial<
    Record<ConsoleMethod, (...args: any[]) => void>
  > = {};

  return {
    name: EPluginNames.BOLTOTRON_REACT_NATIVE,
    onConnect(client: IBoltotronClient) {
      console.warn('🚀 Boltotron: react-native-logger plugin registered');
      if (!client.isReady) return;
      // Patch console methods
      const methods: ConsoleMethod[] = [
        'log',
        'warn',
        'error',
        'info',
        'debug',
      ];

      for (const method of methods) {
        // Store the original method
        originalConsole[method] = console[method];

        // Patch it
        console[method] = (...args: any[]) => {
          // Call original method
          originalConsole[method]?.(...args);

          // Send structured log message
          // Do not change structure and
          // create generic type for send method
          client.send(
            method,
            {
              level: method,
              data: args,
            },
            'react-native-logger'
          );
        };
      }
    },
    //TODO use somehow client instance
    onRegister(client: IBoltotronClient) {
      console.log('🚀 react-native-logger registered');
    },

    onDisconnect(client: IBoltotronClient) {
      // Restore console methods
      for (const method in originalConsole) {
        if (originalConsole[method as ConsoleMethod]) {
          console[method as ConsoleMethod] =
            originalConsole[method as ConsoleMethod]!;
        }
      }
    },

    features() {
      return {
        // Optional helper to manually send logs
        logManual: (msg: string | object) => {
          console.log('🚀 [BoltotronManualLog]', msg);
        },
      };
    },
  };
}
export default boltotron;
