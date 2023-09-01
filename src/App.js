import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { Profile } from './Profile';

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: 'cBPnrONNyvXTVKWtNfaVIaiP5RJA8Nlc' }), publicProvider()],
)
console.log('chains = ', chains)
// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'localhost:3001',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: 'e9d97b06a1dcaf7e1c78710492f314c5',
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected Wallete',
        // shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

function App() {
  return (
    <WagmiConfig config={config}>
      <Profile />
    </WagmiConfig>
  )
}

export default App;