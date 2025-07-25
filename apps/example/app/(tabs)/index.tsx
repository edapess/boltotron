import { View } from 'react-native';
import { TodosList } from '../features/Todos';
import { useHomeScreenStyles } from './settings.styles';

export default function HomeScreen() {
  const styles = useHomeScreenStyles();

  return (
    <View style={styles.container}>
      <TodosList />
    </View>
  );
}
