# 🐝 Swarmi

> **Mobile-native AI-powered DeFi companion on Solana.**  
> Automate yield strategies. Onboard web3 novices through collaborative AI mentor swarms.

---

## Hackathon Scoring Alignment

| Criteria (25% each) | How Swarmi Delivers |
|---|---|
| **Stickiness & PMF** | Gamified swarm mentoring, SKR badges, leaderboard hooks |
| **User Experience** | 3-tap onboarding, natural language mentor chat, biometric signing |
| **Innovation / X Factor** | RL-inspired on-device swarm mentoring — turns DeFi education into guided participation |
| **Presentation & Demo** | Polished APK, live devnet transactions, recorded walkthrough |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Expo + React Native (`create-solana-dapp` — Solana Mobile template) |
| Blockchain | `@solana/kit`, `@solana-mobile/mobile-wallet-adapter` |
| Protocols | Kamino (yield vaults), Jupiter (swaps), SPL Token (USDC transfers) |
| Styling | Uniwind (Tailwind for React Native) |
| State | Zustand |
| AI / ML | TensorFlow.js React Native — on-device, quantized model |
| Navigation | Expo Router (file-based) |
| Build | EAS → APK (`buildType: apk`) |
| RPC | Helius (primary) → public mainnet (fallback) |

---

## Project Structure

```
swarmi/
├── src/
│   ├── app/                        # Expo Router — file-based screens
│   │   ├── _layout.tsx             # Root layout (providers, nav shell)
│   │   ├── index.tsx               # Splash / entry redirect
│   │   ├── (onboarding)/
│   │   │   ├── welcome.tsx         # Splash + CTA
│   │   │   ├── connect.tsx         # Wallet connect (MWA)
│   │   │   └── swarm-intro.tsx     # First mentor chat
│   │   └── (main)/
│   │       ├── _layout.tsx         # Bottom tab navigator
│   │       ├── dashboard.tsx       # Balances + live feed
│   │       ├── optimizer.tsx       # AI yield optimizer
│   │       ├── payments.tsx        # Micropayment scheduler
│   │       └── simulate.tsx        # Offline simulation mode
│   │
│   ├── components/                 # Shared UI primitives
│   │   ├── GlassCard.tsx
│   │   ├── ParticleSwarm.tsx
│   │   ├── SwarmAvatar.tsx
│   │   ├── PrimaryButton.tsx
│   │   ├── BalanceDisplay.tsx
│   │   ├── YieldFeedItem.tsx
│   │   └── ProgressBar.tsx
│   │
│   ├── features/                   # Feature-scoped logic + UI
│   │   ├── onboarding/
│   │   │   ├── SwarmMentorChat.tsx
│   │   │   ├── BadgeUnlock.tsx
│   │   │   └── useSwarmMentor.ts
│   │   ├── vault/
│   │   │   ├── YieldCard.tsx
│   │   │   ├── ExecuteFlow.tsx
│   │   │   └── useYieldVault.ts
│   │   ├── payments/
│   │   │   ├── PaymentForm.tsx
│   │   │   └── usePayments.ts
│   │   └── simulation/
│   │       ├── SimChart.tsx
│   │       └── useSimulation.ts
│   │
│   ├── hooks/                      # Cross-feature hooks
│   │   ├── useWallet.ts            # MWA session + auth state
│   │   ├── useSolanaRpc.ts         # RPC queries via @solana/kit
│   │   └── useOnChainBalance.ts    # SOL + USDC balance polling
│   │
│   ├── stores/                     # Zustand state slices
│   │   ├── walletStore.ts
│   │   ├── portfolioStore.ts
│   │   └── swarmStore.ts
│   │
│   ├── lib/
│   │   ├── solana/
│   │   │   ├── client.ts           # RPC connection factory (Helius → public fallback)
│   │   │   ├── mwa.ts              # MWA helpers (connect, sign, disconnect)
│   │   │   └── tokens.ts           # SPL token utils (USDC transfers)
│   │   ├── ai/
│   │   │   ├── swarmModel.ts       # tfjs model loader + inference runner
│   │   │   └── mentorRules.ts      # Rule-based NLP fallback (MVP)
│   │   └── utils/
│   │       ├── format.ts           # Number/address formatting
│   │       └── cache.ts            # Offline data caching (AsyncStorage)
│   │
│   └── constants/
│       ├── colors.ts               # Design system palette
│       ├── fonts.ts                # Typography config
│       └── config.ts               # RPC endpoints, program IDs, feature flags
│
├── assets/
│   ├── fonts/                      # Space Grotesk + Inter (local)
│   ├── icons/                      # SVG icon set (24×24)
│   ├── animations/                 # Reanimated configs
│   └── models/                     # Quantized tfjs model (bundled)
│
├── app.json
├── eas.json
├── babel.config.js
├── tsconfig.json
└── package.json
```

---

## Core Features

**AI Onboarding Swarm** — Natural language mentor chat that guides novices from zero to first yield position. Gamified with SKR badges and a sandbox mode before going live.

**AI Yield Optimizer** — Suggests and executes auto-compound strategies across Kamino vaults. One-tap execution with MWA biometric signing. Real transactions on Solana.

**Micropayment Scheduler** — Sub-$0.01 USDC transfers via SPL Token. Demonstrates Solana's sub-400ms finality and near-zero fees in a concrete, visual way.

**Offline Simulation Mode** — Risk-free strategy sandbox powered by on-device tfjs inference. No wallet, no RPC — runs fully local. Bridges to live execution when the user is ready.

**Real-Time Dashboard** — Live SOL + USDC balances via RPC, yield feed, offline cache with last-sync timestamp.

---

## Design System

| Token | Value | Usage |
|---|---|---|
| Background | `#0A0E17` | Primary BG (OLED-optimized) |
| Surface | `#1A1F2E` | Glassmorphic cards |
| Primary | `#9945FF` | CTAs, active states |
| Accent | `#14F195` | Yields, success, badges |
| Warning | `#FF6B6B` | Risk labels, errors |
| Info | `#03E1FF` | Charts, tooltips |
| Text Primary | `#F5F7FA` | Headlines |
| Text Secondary | `#A0AEC0` | Body |

Fonts: **Space Grotesk** (headlines, CTAs) + **Inter** (body, data).

---

## Setup

### Prerequisites

- Node.js 18+
- Android Studio + Pixel 8 emulator (API 36) or physical Android 13+ device
- EAS CLI: `npm install -g eas-cli`
- Phantom or Backpack wallet installed on the same device

### Bootstrap

```bash
npm create solana-dapp@latest
# Select: Solana Mobile → Expo
```

### Install

```bash
npm install
```

### Environment

Create `.env.local`:

```env
EXPO_PUBLIC_RPC_URL=https://rpc.helius.xyz/?api-key=YOUR_KEY
EXPO_PUBLIC_NETWORK=mainnet-beta
EXPO_PUBLIC_AI_ENABLED=false
```

> `AI_ENABLED=false` uses rule-based mentor responses (faster iteration). Flip to `true` when the tfjs model is bundled under `assets/models/`.

### Run

```bash
npm run android
```

### Build APK

```bash
eas build --platform android --profile dapp-store
```

Profile config in `eas.json`:

```json
{
  "build": {
    "dapp-store": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

---

## Architecture Notes

**Feature-first structure.** Each feature (`onboarding`, `vault`, `payments`, `simulation`) owns its components, hooks, and types. Cross-cutting concerns (wallet, RPC, state) live in `hooks/`, `stores/`, and `lib/`. Two devs can work on separate features without file conflicts.

**Blockchain is the backend.** No custom server. Wallet identity = pubkey via MWA. Balances and transactions go directly to Solana RPC. Kamino and Jupiter APIs are consumed read-only for strategy data.

**AI is feature-flagged.** `mentorRules.ts` handles the MVP mentor chat. `swarmModel.ts` wraps tfjs for the quantized model — swapped in via `EXPO_PUBLIC_AI_ENABLED`. No model training on the critical path.

**Offline-first.** Dashboard caches via AsyncStorage. Simulation runs entirely local. RPC failures degrade gracefully with cached data and a sync timestamp.

**MWA for all signing.** Private keys never enter the app. All transactions are assembled client-side and sent to MWA for biometric signing — follows the Solana Mobile security model exactly.

---

## References

- [Solana Mobile Docs — Create a Project](https://docs.solanamobile.com/get-started/react-native/create-solana-mobile-app)
- [Mobile Wallet Adapter](https://docs.solanamobile.com/get-started/mobile-wallet-adapter)
- [Kamino Finance](https://kamino.finance)
- [Jupiter Aggregator](https://jup.ag)
- [Helius RPC](https://helius.dev)

---

## License

MIT — Built for Solana Mobile Hackathon 2026.