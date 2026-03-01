import { View, Text, Pressable, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'

const STEPS = [
  {
    icon: '🐝',
    title: 'Meet the Swarm',
    body: 'Swarmi runs a swarm of AI agents that continuously scan Solana DeFi protocols — Marinade, Kamino, Orca — to find you the best yields.',
  },
  {
    icon: '📊',
    title: 'Yield, Optimized',
    body: "Every few hours, the swarm rebalances your portfolio automatically. You set the risk level, we handle the rest. No spreadsheets. No gas math.",
  },
  {
    icon: '🧠',
    title: 'AI That Explains Itself',
    body: "Before any action, Swarmi tells you exactly what it's doing and why — in plain English. You can approve, tweak, or veto anything.",
  },
  {
    icon: '🔐',
    title: 'Your Keys, Always',
    body: 'Swarmi never holds your funds. All strategies execute through your connected wallet. You sign. You own.',
  },
]

export default function SwarmIntro() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  return (
    <View className="flex-1 bg-gray-950 px-8 pt-16 pb-12 justify-between">
      <View className="flex-row gap-2 justify-center mb-12">
        {STEPS.map((_, i) => (
          <View
            key={i}
            className={`h-1.5 rounded-full ${i === step ? 'w-8 bg-teal-400' : 'w-2 bg-gray-700'}`}
          />
        ))}
      </View>

      <View className="flex-1 items-center justify-center">
        <View className="w-24 h-24 rounded-3xl bg-gray-900 border border-gray-800 items-center justify-center mb-8">
          <Text style={{ fontSize: 44 }}>{current.icon}</Text>
        </View>
        <Text className="text-white text-3xl font-black text-center mb-4 leading-tight">{current.title}</Text>
        <Text className="text-gray-400 text-center text-base leading-7 max-w-xs">{current.body}</Text>
      </View>

      <View className="gap-3">
        <Pressable
          onPress={() => {
            if (isLast) router.push('/(onboarding)/connect')
            else setStep(step + 1)
          }}
          className="bg-teal-500 active:bg-teal-600 rounded-2xl py-4 items-center"
        >
          <Text className="text-gray-950 font-black text-lg">
            {isLast ? 'Connect Wallet →' : 'Next'}
          </Text>
        </Pressable>
        {step > 0 && (
          <Pressable onPress={() => setStep(step - 1)} className="py-3 items-center">
            <Text className="text-gray-500 font-medium">Back</Text>
          </Pressable>
        )}
        {step === 0 && (
          <Pressable onPress={() => router.push('/(onboarding)/connect')} className="py-3 items-center">
            <Text className="text-gray-500 font-medium">Skip intro</Text>
          </Pressable>
        )}
      </View>
    </View>
  )
}