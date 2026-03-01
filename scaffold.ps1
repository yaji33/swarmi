# Swarmi — Project Scaffold
# Run from project root: PS C:\S\Swarmi> .\scaffold.ps1

$files = @(
    # App screens
    "src/app/(onboarding)/welcome.tsx",
    "src/app/(onboarding)/connect.tsx",
    "src/app/(onboarding)/swarm-intro.tsx",
    "src/app/(main)/_layout.tsx",
    "src/app/(main)/dashboard.tsx",
    "src/app/(main)/optimizer.tsx",
    "src/app/(main)/payments.tsx",
    "src/app/(main)/simulate.tsx",

    # Shared components
    "src/components/GlassCard.tsx",
    "src/components/ParticleSwarm.tsx",
    "src/components/SwarmAvatar.tsx",
    "src/components/PrimaryButton.tsx",
    "src/components/BalanceDisplay.tsx",
    "src/components/YieldFeedItem.tsx",
    "src/components/ProgressBar.tsx",

    # Features
    "src/features/onboarding/SwarmMentorChat.tsx",
    "src/features/onboarding/BadgeUnlock.tsx",
    "src/features/onboarding/useSwarmMentor.ts",
    "src/features/vault/YieldCard.tsx",
    "src/features/vault/ExecuteFlow.tsx",
    "src/features/vault/useYieldVault.ts",
    "src/features/payments/PaymentForm.tsx",
    "src/features/payments/usePayments.ts",
    "src/features/simulation/SimChart.tsx",
    "src/features/simulation/useSimulation.ts",

    # Hooks
    "src/hooks/useWallet.ts",
    "src/hooks/useSolanaRpc.ts",
    "src/hooks/useOnChainBalance.ts",

    # Stores
    "src/stores/walletStore.ts",
    "src/stores/portfolioStore.ts",
    "src/stores/swarmStore.ts",

    # Lib — Solana
    "src/lib/solana/client.ts",
    "src/lib/solana/mwa.ts",
    "src/lib/solana/tokens.ts",

    # Lib — AI
    "src/lib/ai/swarmModel.ts",
    "src/lib/ai/mentorRules.ts",

    # Lib — Utils
    "src/lib/utils/format.ts",
    "src/lib/utils/cache.ts",

    # Constants
    "src/constants/colors.ts",
    "src/constants/fonts.ts",
    "src/constants/config.ts",

    # Assets
    "assets/models/.gitkeep"
)

foreach ($file in $files) {
    $dir = Split-Path $file
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    if (!(Test-Path $file)) {
        New-Item -ItemType File -Path $file -Force | Out-Null
        Write-Host "created  $file" -ForegroundColor Green
    } else {
        Write-Host "exists   $file" -ForegroundColor DarkGray
    }
}

Write-Host "`nDone. All files scaffolded." -ForegroundColor Cyan