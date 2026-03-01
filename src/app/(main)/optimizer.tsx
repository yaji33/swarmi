import { View, Text, ScrollView, Pressable } from 'react-native'
import { useState } from 'react'

const RISK_LEVELS = [
  {
    id: 'conservative',
    label: 'Conservative',
    icon: '🛡️',
    apy: '6–9%',
    description: 'Staking + liquid staking only. Maximum safety, stable returns.',
    protocols: ['Marinade', 'Jito'],
    color: 'border-blue-500/40 bg-blue-500/5',
    badge: 'text-blue-400 bg-blue-500/10',
  },
  {
    id: 'balanced',
    label: 'Balanced',
    icon: '⚖️',
    apy: '10–15%',
    description: 'Mix of staking and lending. Good returns with managed risk.',
    protocols: ['Marinade', 'Kamino', 'Solend'],
    color: 'border-teal-500/40 bg-teal-500/5',
    badge: 'text-teal-400 bg-teal-500/10',
  },
  {
    id: 'aggressive',
    label: 'Aggressive',
    icon: '🚀',
    apy: '18–30%',
    description: 'LP positions + concentrated liquidity. High reward, higher risk.',
    protocols: ['Orca', 'Raydium', 'Kamino'],
    color: 'border-orange-500/40 bg-orange-500/5',
    badge: 'text-orange-400 bg-orange-500/10',
  },
]

const STRATEGIES = [
  { name: 'mSOL Staking Loop', protocol: 'Marinade', apy: '8.1%', tvl: '$1.2B', risk: 'Low' },
  { name: 'USDC Lending', protocol: 'Kamino', apy: '13.2%', tvl: '$340M', risk: 'Med' },
  { name: 'SOL-USDC LP', protocol: 'Orca', apy: '21.5%', tvl: '$89M', risk: 'High' },
  { name: 'JLP Yield', protocol: 'Jupiter', apy: '28.4%', tvl: '$620M', risk: 'High' },
]

export default function Optimizer() {
  const [selectedRisk, setSelectedRisk] = useState('balanced')
  const [autoRebalance, setAutoRebalance] = useState(true)

  return (
    <ScrollView className="flex-1 bg-gray-950" contentContainerClassName="pb-8">
      <View className="px-6 pt-16 pb-6">
        <Text className="text-white text-3xl font-black mb-1">Yield Optimizer</Text>
        <Text className="text-gray-500 text-sm">Set your risk profile. The swarm handles the rest.</Text>
      </View>
      <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest px-6 mb-3">Risk Profile</Text>
      <View className="px-6 gap-3 mb-6">
        {RISK_LEVELS.map((r) => (
          <Pressable
            key={r.id}
            onPress={() => setSelectedRisk(r.id)}
            className={`border rounded-2xl px-5 py-4 ${r.color} ${selectedRisk === r.id ? 'border-opacity-100' : 'border-gray-800 bg-transparent'}`}
          >
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-3">
                <Text style={{ fontSize: 22 }}>{r.icon}</Text>
                <Text className="text-white font-bold text-base">{r.label}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className={`rounded-full px-3 py-1 ${r.badge}`}>
                  <Text className={`text-xs font-bold ${r.badge.split(' ')[0]}`}>{r.apy} APY</Text>
                </View>
                {selectedRisk === r.id && <Text className="text-teal-400">✓</Text>}
              </View>
            </View>
            <Text className="text-gray-400 text-sm leading-5">{r.description}</Text>
            <Text className="text-gray-600 text-xs mt-2">Protocols: {r.protocols.join(', ')}</Text>
          </Pressable>
        ))}
      </View>
      <View className="mx-6 flex-row items-center justify-between bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 mb-6">
        <View>
          <Text className="text-white font-semibold">Auto-rebalance</Text>
          <Text className="text-gray-500 text-xs">Swarm reallocates every 6 hours</Text>
        </View>
        <Pressable
          onPress={() => setAutoRebalance(!autoRebalance)}
          className={`w-12 h-7 rounded-full items-center justify-center ${autoRebalance ? 'bg-teal-500' : 'bg-gray-700'}`}
        >
          <View className={`w-5 h-5 rounded-full bg-white ${autoRebalance ? 'ml-2' : '-ml-2'}`} />
        </Pressable>
      </View>
      <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest px-6 mb-3">Top Strategies Now</Text>
      <View className="px-6 gap-3">
        {STRATEGIES.map((s) => (
          <View key={s.name} className="bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white font-semibold text-sm">{s.name}</Text>
              <Text className="text-gray-500 text-xs">{s.protocol} · TVL {s.tvl}</Text>
            </View>
            <View className="items-end gap-1">
              <Text className="text-teal-400 font-bold text-sm">{s.apy}</Text>
              <View className={`rounded-full px-2 py-0.5 ${s.risk === 'Low' ? 'bg-blue-500/10' : s.risk === 'Med' ? 'bg-yellow-500/10' : 'bg-red-500/10'}`}>
                <Text className={`text-xs font-semibold ${s.risk === 'Low' ? 'text-blue-400' : s.risk === 'Med' ? 'text-yellow-400' : 'text-red-400'}`}>{s.risk}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View className="px-6 mt-6">
        <Pressable className="bg-teal-500 active:bg-teal-600 rounded-2xl py-4 items-center">
          <Text className="text-gray-950 font-black text-base">Apply Strategy</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}