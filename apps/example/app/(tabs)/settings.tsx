import { useCallback } from 'react';
import { View, Switch } from 'react-native';
import { AnimatedPieChart } from '../../src/components/AnimatedDonutChart/AnimatedPieChart';
import { ThemedText } from '../../src/components/ThemedText';
import { ThemedView } from '../../src/components/ThemedView';
import { useGeneratePieChartData } from '../../src/hooks/useGeneratePieChartData';
import { useAppSelector } from '../../src/hooks/useRedux';
import { selectTodos } from '../../src/store/slices/todos/selectors';

import { useIsDark, useThemeContext } from '../../src/utils/uiUtils/themeUtils';
import { useSettingsScreenStyles } from './settings.styles';

export default function SettingsScreen() {
  const isDark = useIsDark();
  const { setTheme } = useThemeContext();
  const { container, switchContainer } = useSettingsScreenStyles();
  const todos = useAppSelector(selectTodos);
  const pieChartData = useGeneratePieChartData(todos);
  const onChangeTheme = useCallback(
    (value: boolean) => {
      const newTheme = value ? 'dark' : 'light';
      setTheme(newTheme);
    },
    [setTheme],
  );

  return (
    <ThemedView style={container}>
      <View style={switchContainer}>
        <ThemedText>{`Turn ${isDark ? 'Off' : 'On'} Dark mode`}</ThemedText>
        <Switch onValueChange={onChangeTheme} value={isDark} />
      </View>
      <AnimatedPieChart data={pieChartData} />
    </ThemedView>
  );
}
