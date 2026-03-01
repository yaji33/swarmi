import { View, Text, Pressable, Animated } from 'react-native'
import { useEffect, useRef } from 'react'
import { useRouter } from 'expo-router'

export default function Welcome() {
  const router = useRouter()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(40)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
    ]).start()
  }, [])

  return (
    <View className="flex-1 bg-gray-950 items-center justify-between px-8 pt-24 pb-16">
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }} className="items-center">
        <View className="w-24 h-24 rounded-3xl bg-teal-500 items-center justify-center mb-6 shadow-lg">
          <Text style={{ fontSize: 48 }}>🐝</Text>
        </View>
        <Text className="text-5xl font-black text-white tracking-tighter mb-2">Swarmi</Text>
        <Text className="text-teal-400 text-lg font-semibold tracking-widest uppercase mb-10">DeFi, Automated</Text>

        <Text className="text-gray-300 text-center text-base leading-7 max-w-xs">
          Your AI-powered yield companion on Solana. Let the swarm work while you sleep.
        </Text>
      </Animated.View>

      <Animated.View style={{ opacity: fadeAnim }} className="w-full gap-3">
        {[
          { icon: '⚡', label: 'Automated yield strategies' },
          { icon: '🤖', label: 'AI onboarding — no jargon' },
          { icon: '🔒', label: 'Non-custodial, always yours' },
        ].map((f) => (
          <View key={f.label} className="flex-row items-center bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 gap-4">
            <Text style={{ fontSize: 22 }}>{f.icon}</Text>
            <Text className="text-gray-200 font-medium text-base">{f.label}</Text>
          </View>
        ))}
      </Animated.View>

      <Animated.View style={{ opacity: fadeAnim }} className="w-full gap-3">
        <Pressable
          onPress={() => router.push('/(onboarding)/swarm-intro')}
          className="bg-teal-500 active:bg-teal-600 rounded-2xl py-4 items-center"
        >
          <Text className="text-gray-950 font-black text-lg tracking-tight">Get Started</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/(onboarding)/connect')}
          className="rounded-2xl py-4 items-center border border-gray-700"
        >
          <Text className="text-gray-400 font-semibold text-base">I already have a wallet</Text>
        </Pressable>
      </Animated.View>
    </View>
  )
}