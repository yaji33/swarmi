import { View, Text, ScrollView, Pressable } from 'react-native'
import { useState } from 'react'

const SCENARIOS = [
  {
    id: 'bull',
    label: 'Bull Market',
    icon: '🐂',
    description: 'SOL +200%, strong DeFi inflows, APYs compress as TVL grows.',
    projectedReturn: '+$312.40',
    returnPct: '+34.1%',
    positive: true,
  },
  {
    id: 'bear',
    label: 'Bear Market',
    icon: '🐻',
    description: '6-month drawdown, SOL -60%, liquidity crunch across protocols.',
    projectedReturn: '-$189.20',
    returnPct: '-20.6%',
    positive: false,
  },
  {
    id: 'sideways',
    label: 'Sideways Grind',
    icon: '📈',
    description: 'Low volatility, yield-farm returns dominate. Steady compounding.',
    projectedReturn: '+$108.10',
    returnPct: '+11.8%',
    positive: true,
  },
  {
    id: 'black_swan',
    label: 'Black Swan',
    icon: '🦢',
    description: 'Protocol exploit on one platform. Swarm emergency exit triggered.',
    projectedReturn: '-$55.30',
    returnPct: '-6.0%',
    positive: false,
  },
]

const TIMELINE = ['1M', '3M', '6M', '1Y']

export default function Simulate() {
  const [selected, setSelected] = useState('bull')
  const [timeline, setTimeline] = useState('3M')
  const scenario = SCENARIOS.find((s) => s.id === selected)!

  return (
    <ScrollView className="flex-1 bg-gray-950" contentContainerClassName="pb-8">
      <View className="px-6 pt-16 pb-6">
        <Text className="text-white text-3xl font-black mb-1">Simulation</Text>
        <Text className="text-gray-500 text-sm">Test your portfolio against future scenarios</Text>
      </View>

      <View className="mx-6 flex-row items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 mb-6">
        <Text style={{ fontSize: 16 }}>🧪</Text>
        <Text className="text-yellow-400 text-xs font-semibold">Simulation mode — no real funds involved</Text>
      </View>

      <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest px-6 mb-3">Timeframe</Text>
      <View className="flex-row px-6 gap-2 mb-6">
        {TIMELINE.map((t) => (
          <Pressable
            key={t}
            onPress={() => setTimeline(t)}
            className={`flex-1 py-2.5 rounded-xl items-center border ${timeline === t ? 'bg-teal-500 border-teal-500' : 'bg-gray-900 border-gray-800'}`}
          >
            <Text className={`font-bold text-sm ${timeline === t ? 'text-gray-950' : 'text-gray-400'}`}>{t}</Text>
          </Pressable>
        ))}
      </View>

      <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest px-6 mb-3">Market Scenario</Text>
      <View className="px-6 gap-3 mb-6">
        {SCENARIOS.map((s) => (
          <Pressable
            key={s.id}
            onPress={() => setSelected(s.id)}
            className={`border rounded-2xl px-5 py-4 ${selected === s.id ? 'border-teal-500/40 bg-teal-500/5' : 'border-gray-800 bg-gray-900'}`}
          >
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-3">
                <Text style={{ fontSize: 22 }}>{s.icon}</Text>
                <Text className="text-white font-bold">{s.label}</Text>
              </View>
              {selected === s.id && <Text className="text-teal-400 font-bold">✓</Text>}
            </View>
            <Text className="text-gray-400 text-sm leading-5">{s.description}</Text>
          </Pressable>
        ))}
      </View>

      <View className="mx-6 bg-gray-900 border border-gray-800 rounded-3xl p-6">
        <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">
          Projected outcome · {timeline}
        </Text>
        <View className="flex-row items-center gap-3 mb-2">
          <Text style={{ fontSize: 32 }}>{scenario.icon}</Text>
          <View>
            <Text className="text-white text-4xl font-black">{scenario.projectedReturn}</Text>
            <Text className={`text-lg font-bold ${scenario.positive ? 'text-teal-400' : 'text-red-400'}`}>
              {scenario.returnPct} · {scenario.label}
            </Text>
          </View>
        </View>
        <Text className="text-gray-500 text-sm leading-6 mt-2">
          Starting from $919.70 current portfolio value with {timeline} {scenario.label.toLowerCase()} conditions.
        </Text>

        <Pressable className="mt-5 bg-gray-800 active:bg-gray-700 rounded-xl py-3 items-center">
          <Text className="text-gray-300 font-semibold text-sm">Run Full Simulation Report</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}