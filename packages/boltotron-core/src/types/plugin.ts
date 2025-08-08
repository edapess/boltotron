import { IBoltotronClient } from 'src/lib';
import { IBoltotronMessage } from './messages';

export interface IBoltotronPlugin {
  name: EPluginNames;
  onRegister?(client: IBoltotronClient): void;
  onConnect?(client: IBoltotronClient): void;
  onDisconnect?(client: IBoltotronClient): void;
  onMessage?(message: IBoltotronMessage | null, client: IBoltotronClient): void;
  features?: (
    client: IBoltotronClient
  ) => Record<string, (...args: any[]) => any>;
}

export enum EPluginNames {
  BOLTOTRON_REACT_NATIVE = 'boltotron-react-native',
}
