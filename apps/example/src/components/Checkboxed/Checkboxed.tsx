import { FC } from 'react';
import { Pressable, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { useCheckboxedStyles } from './Checkboxed.styles';

type TCheckboxed = {
  selected: boolean;
  onPress: () => void;
  content: string;
  testID: string;
};

export const Checkboxed: FC<TCheckboxed> = ({
  selected,
  content,
  onPress,
  testID,
}) => {
  const styles = useCheckboxedStyles();

  return (
    <ThemedView style={styles.container}>
      <Pressable testID={testID} onPress={onPress} style={styles.pressable}>
        <View style={[styles.checkBox, selected && styles.selectedCheckbox]} />
        <ThemedText numberOfLines={3} style={styles.content}>
          {content}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
};
