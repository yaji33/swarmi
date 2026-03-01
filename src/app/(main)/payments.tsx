import { View, Text, ScrollView, Pressable, TextInput } from 'react-native'
import { useState } from 'react'
import { useMobileWallet } from '@wallet-ui/react-native-kit'

const RECENT = [
  { address: '7xKF...3mPQ', label: 'Alice', amount: '0.1 SOL', time: '1h ago' },
  { address: '4rBN...9wZT', label: 'Dev Fund', amount: '5 USDC', time: '3h ago' },
  { address: '9hYD...1kLM', label: 'Bob', amount: '0.05 SOL', time: '1d ago' },
]

const QUICK_AMOUNTS = ['0.01', '0.1', '0.5', '1.0']

export default function Payments() {
  const { account } = useMobileWallet()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [token, setToken] = useState<'SOL' | 'USDC'>('SOL')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSend = async () => {
    if (!recipient || !amount) return
    setSending(true)
    await new Promise((r) => setTimeout(r, 1500)) // placeholder
    setSending(false)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setRecipient('')
    setAmount('')
  }

  return (
    <ScrollView className="flex-1 bg-gray-950" contentContainerClassName="pb-8">
      <View className="px-6 pt-16 pb-6">
        <Text className="text-white text-3xl font-black mb-1">Send</Text>
        <Text className="text-gray-500 text-sm">Micropayments on Solana — near-zero fees</Text>
      </View>

      {sent && (
        <View className="mx-6 mb-4 bg-teal-500/10 border border-teal-500/30 rounded-2xl px-5 py-4 flex-row items-center gap-3">
          <Text style={{ fontSize: 20 }}>✅</Text>
          <Text className="text-teal-300 font-semibold">Transaction sent!</Text>
        </View>
      )}

      <View className="mx-6 bg-gray-900 border border-gray-800 rounded-3xl p-5 mb-6">
        <View className="flex-row bg-gray-800 rounded-xl p-1 mb-4">
          {(['SOL', 'USDC'] as const).map((t) => (
            <Pressable
              key={t}
              onPress={() => setToken(t)}
              className={`flex-1 py-2 rounded-lg items-center ${token === t ? 'bg-teal-500' : ''}`}
            >
              <Text className={`font-bold text-sm ${token === t ? 'text-gray-950' : 'text-gray-500'}`}>{t}</Text>
            </Pressable>
          ))}
        </View>

        <Text className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-2">Amount</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          placeholderTextColor="#4b5563"
          keyboardType="decimal-pad"
          className="text-white text-4xl font-black mb-2"
          style={{ fontSize: 40, color: '#fff', fontWeight: '900' }}
        />
        <View className="flex-row gap-2 mb-4">
          {QUICK_AMOUNTS.map((a) => (
            <Pressable key={a} onPress={() => setAmount(a)} className="bg-gray-800 rounded-lg px-3 py-1.5">
              <Text className="text-gray-400 text-xs font-semibold">{a}</Text>
            </Pressable>
          ))}
        </View>

        <Text className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-2">Recipient</Text>
        <TextInput
          value={recipient}
          onChangeText={setRecipient}
          placeholder="Solana address or .sol domain"
          placeholderTextColor="#4b5563"
          className="bg-gray-800 rounded-xl px-4 py-3 text-white font-mono text-sm"
          style={{ color: '#fff', fontSize: 13 }}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View className="px-6 mb-8">
        <Pressable
          onPress={handleSend}
          disabled={sending || !recipient || !amount}
          className={`rounded-2xl py-4 items-center ${sending || !recipient || !amount ? 'bg-gray-800' : 'bg-teal-500 active:bg-teal-600'}`}
        >
          <Text className={`font-black text-base ${sending || !recipient || !amount ? 'text-gray-600' : 'text-gray-950'}`}>
            {sending ? 'Sending...' : `Send ${amount || '0'} ${token}`}
          </Text>
        </Pressable>
      </View>

      <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest px-6 mb-3">Recent</Text>
      <View className="px-6 gap-3">
        {RECENT.map((r) => (
          <Pressable key={r.address} onPress={() => setRecipient(r.address)} className="flex-row items-center bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 gap-4">
            <View className="w-10 h-10 rounded-xl bg-gray-800 items-center justify-center">
              <Text className="text-white font-bold">{r.label[0]}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white font-semibold text-sm">{r.label}</Text>
              <Text className="text-gray-600 text-xs font-mono">{r.address}</Text>
            </View>
            <View className="items-end">
              <Text className="text-gray-300 text-sm font-semibold">{r.amount}</Text>
              <Text className="text-gray-600 text-xs">{r.time}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  )
}