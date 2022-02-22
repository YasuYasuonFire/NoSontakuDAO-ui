import { BigNumber } from 'ethers'
import { ChainId, CHAIN_ID, NETWORK_CONFIG } from './network'

export const getChainInfo = (chainId: number) =>
  // @ts-expect-error
  CHIAN_INFO[chainId]

const toChainIdHex = (chainId: number) =>
  `0x${(+BigNumber.from(chainId)).toString(16)}`

const CHIAN_INFO: Record<ChainId, AddEthereumChainParameter> = {
  [CHAIN_ID.shiden]: {
    chainId: toChainIdHex(CHAIN_ID.shiden),
    chainName: NETWORK_CONFIG[CHAIN_ID.shiden].name,
    nativeCurrency: {
      name: 'Shiden',
      symbol: NETWORK_CONFIG[CHAIN_ID.shiden].baseAsset.symbol,
      decimals: 18,
    },
    rpcUrls: [...NETWORK_CONFIG[CHAIN_ID.shiden].publicJsonRPCUrl],
    blockExplorerUrls: NETWORK_CONFIG[CHAIN_ID.shiden].explorerLinks,
  },
}