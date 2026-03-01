import { View, Text, ScrollView, Pressable } from 'react-native'
import { useMobileWallet } from '@wallet-ui/react-native-kit'
import { useRouter } from 'expo-router'

const POSITIONS = [
  { protocol: 'Marinade', token: 'mSOL', apy: '7.2%', value: '$420.00', change: '+$2.10', positive: true },
  { protocol: 'Kamino', token: 'USDC', apy: '12.8%', value: '$310.50', change: '+$1.08', positive: true },
  { protocol: 'Orca', token: 'SOL-USDC', apy: '18.4%', value: '$189.20', change: '-$0.43', positive: false },
]

const ACTIVITY = [
  { action: 'Rebalanced', detail: 'Moved 5% from Orca → Kamino', time: '2h ago', icon: '⚡' },
  { action: 'Yield claimed', detail: '0.12 SOL earned from Marinade', time: '8h ago', icon: '💰' },
  { action: 'Strategy updated', detail: 'Risk level adjusted to Balanced', time: '1d ago', icon: '🤖' },
]

export default function Dashboard() {
  const { account, disconnect } = useMobileWallet()
  const router = useRouter()
  const addr = account?.address?.toString()

  return (
    <ScrollView className="flex-1 bg-gray-950" contentContainerClassName="pb-8">
      <View className="px-6 pt-16 pb-6 flex-row items-center justify-between">
        <View>
          <Text className="text-gray-500 text-sm font-medium">Connected</Text>
          <Text className="text-teal-400 text-sm font-mono">
            {addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : 'Not connected'}
          </Text>
        </View>
        <Pressable onPress={disconnect} className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2">
          <Text className="text-gray-400 text-sm font-medium">Disconnect</Text>
        </Pressable>
      </View>
      <View className="mx-6 bg-gray-900 border border-gray-800 rounded-3xl p-6 mb-6">
        <Text className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-1">Total Portfolio</Text>
        <Text className="text-white text-5xl font-black mb-1">$919.70</Text>
        <View className="flex-row items-center gap-2">
          <View className="bg-teal-500/20 rounded-full px-3 py-1">
            <Text className="text-teal-400 text-sm font-bold">+$2.75 today</Text>
          </View>
          <Text className="text-gray-600 text-sm">Avg APY: 12.1%</Text>
        </View>
      </View>
      <View className="mx-6 flex-row items-center bg-teal-500/10 border border-teal-500/20 rounded-2xl px-5 py-4 mb-6 gap-3">
        <Text style={{ fontSize: 20 }}>🐝</Text>
        <View className="flex-1">
          <Text className="text-teal-300 font-bold text-sm">Swarm is active</Text>
          <Text className="text-teal-500/70 text-xs">Next rebalance check in 3h 22m</Text>
        </View>
        <Pressable onPress={() => router.push('/(main)/optimizer')}>
          <Text className="text-teal-400 text-sm font-semibold">Manage →</Text>
        </Pressable>
      </View>
      <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest px-6 mb-3">Active Positions</Text>
      <View className="px-6 gap-3 mb-6">
        {POSITIONS.map((p) => (
          <View key={p.token} className="bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4">
            <View className="flex-row items-center justify-between mb-1">
              <View>
                <Text className="text-white font-bold text-base">{p.token}</Text>
                <Text className="text-gray-500 text-xs">{p.protocol}</Text>
              </View>
              <View className="items-end">
                <Text className="text-white font-bold text-base">{p.value}</Text>
                <Text className={`text-xs font-semibold ${p.positive ? 'text-teal-400' : 'text-red-400'}`}>{p.change}</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-2 mt-2">
              <View className="bg-gray-800 rounded-full px-2 py-0.5">
                <Text className="text-teal-400 text-xs font-bold">{p.apy} APY</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest px-6 mb-3">Recent Activity</Text>
      <View className="px-6 gap-3">
        {ACTIVITY.map((a) => (
          <View key={a.action + a.time} className="flex-row items-start gap-4">
            <View className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 items-center justify-center">
              <Text style={{ fontSize: 16 }}>{a.icon}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white font-semibold text-sm">{a.action}</Text>
              <Text className="text-gray-500 text-xs">{a.detail}</Text>
            </View>
            <Text className="text-gray-600 text-xs">{a.time}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}