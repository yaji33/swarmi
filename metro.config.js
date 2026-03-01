const { getDefaultConfig } = require('expo/metro-config')
const { withUniwindConfig } = require('uniwind/metro')
const path = require('path')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  'C:/p',
]

config.resolver.unstable_enableSymlinks = true

const uniwindConfig = withUniwindConfig(config, {
  cssEntryFile: './src/global.css',
  dtsFile: './src/uniwind-types.d.ts',
})

module.exports = uniwindConfig
