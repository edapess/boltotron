import { Tabs } from 'expo-router';
import { HapticTab } from '../../src/components/HapticTab';
import { IconSymbol } from '../../src/components/ui/IconSymbol';
import { useUiTheme } from '../../src/utils/uiUtils/themeUtils';

export default function TabLayout() {
  const colors = useUiTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colors.card,
          position: 'absolute',
          paddingTop: 16,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gear.badge" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
