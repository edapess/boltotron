import { useReactNative, boltotron } from '@boltotron-react-native';

boltotron
  .configure({ host: '127.0.0.1', port: 7878 })
  .use(useReactNative())
  .connect();
