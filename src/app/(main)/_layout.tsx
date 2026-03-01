import { Tabs } from 'expo-router'
import { Text } from 'react-native'

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.4 }}>{icon}</Text>
}

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0a0a0f',
          borderTopColor: '#1f2937',
          borderTopWidth: 1,
          height: 72,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#2dd4bf',
        tabBarInactiveTintColor: '#4b5563',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ focused }) => <TabIcon icon="📊" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="optimizer"
        options={{
          title: 'Optimizer',
          tabBarIcon: ({ focused }) => <TabIcon icon="⚡" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: 'Pay',
          tabBarIcon: ({ focused }) => <TabIcon icon="💸" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="simulate"
        options={{
          title: 'Simulate',
          tabBarIcon: ({ focused }) => <TabIcon icon="🧪" focused={focused} />,
        }}
      />
    </Tabs>
  )
}