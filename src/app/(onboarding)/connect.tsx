import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useMobileWallet } from '@wallet-ui/react-native-kit'
import { useState } from 'react'

export default function Connect() {
  const router = useRouter()
  const { account, connect } = useMobileWallet()
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConnect = async () => {
    try {
      setConnecting(true)
      setError(null)
      await connect()
      router.replace('/(main)/dashboard')
    } catch (e: any) {
      setError(e?.message ?? 'Connection failed. Make sure a Solana wallet app is installed.')
    } finally {
      setConnecting(false)
    }
  }

  return (
    <View className="flex-1 bg-gray-950 px-8 pt-20 pb-16 justify-between">
      <View className="items-center">
        <View className="w-20 h-20 rounded-3xl bg-teal-500/10 border border-teal-500/30 items-center justify-center mb-6">
          <Text style={{ fontSize: 40 }}>🔑</Text>
        </View>
        <Text className="text-white text-3xl font-black mb-3 text-center">Connect Your Wallet</Text>
        <Text className="text-gray-400 text-center text-base leading-7 max-w-xs">
          Swarmi uses Mobile Wallet Adapter to connect securely to any Solana wallet on your device.
        </Text>
      </View>

      <View className="bg-gray-900 border border-gray-800 rounded-3xl p-6 gap-4">
        <Text className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-2">Compatible wallets</Text>
        {['Phantom', 'Solflare', 'Backpack', 'Seeker'].map((w) => (
          <View key={w} className="flex-row items-center gap-3">
            <View className="w-2 h-2 rounded-full bg-teal-400" />
            <Text className="text-gray-300 font-medium">{w}</Text>
          </View>
        ))}
      </View>

      {error && (
        <View className="bg-red-500/10 border border-red-500/30 rounded-2xl px-5 py-4">
          <Text className="text-red-400 text-sm text-center">{error}</Text>
        </View>
      )}

      <View className="gap-3">
        <Pressable
          onPress={handleConnect}
          disabled={connecting}
          className="bg-teal-500 active:bg-teal-600 rounded-2xl py-4 items-center flex-row justify-center gap-3"
        >
          {connecting ? (
            <ActivityIndicator color="#0a0a0a" />
          ) : (
            <Text className="text-gray-950 font-black text-lg">Connect with MWA</Text>
          )}
        </Pressable>
        <Pressable onPress={() => router.back()} className="py-3 items-center">
          <Text className="text-gray-500 font-medium">Go back</Text>
        </Pressable>
      </View>
    </View>
  )
}