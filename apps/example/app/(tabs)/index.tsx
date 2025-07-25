import { View } from 'react-native';
import { TodosList } from '../features/Todos';
import { useHomeScreenStyles } from './settings.styles';

export default function HomeScreen() {
  const syles = useHomeScreenStyles();

  return (
    <View style={syles.container}>
      <TodosList />
    </View>
  );
}
