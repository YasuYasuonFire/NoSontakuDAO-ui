import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
//import { useState } from 'react'
import { SymbolLay } from 'src/assets/images'
import { IconSettings, LogoProtocol } from 'src/assets/svgs'
import { Image } from 'src/components/elements/Image'
import { Link } from 'src/components/elements/Link'
import { IconLink } from 'src/components/parts/Link'
import { useRewardModal } from 'src/components/parts/Modal/RewardModal'
import { useWalletModal } from 'src/components/parts/Modal/WalletModal'
import { useLAYPrice } from 'src/hooks/useLAYPrice'
import { useUserData } from 'src/hooks/useUserData'
import { useWallet } from 'src/hooks/useWallet'
import { darkGray, purple, trueWhite } from 'src/styles/colors'
import { fontWeightHeavy } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import { shortenAddress } from 'src/utils/address'
import { formatUSD } from 'src/utils/number'
import {
  APP,
  LAUNCHPAD,
  LAY_VELAY,
  MAKAI,
  MARKETS,
  SWAP,
} from 'src/utils/routes'
import styled, { css } from 'styled-components'
import { useGasSettingsModal } from '../Modal/GasSettingsModal'
import { HeaderWrapper } from './common'

//☆add
import type { NextPage } from 'next'
import { useState, useCallback, useEffect } from 'react'
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api'
import { Abi, ContractPromise } from '@polkadot/api-contract'
import type { WeightV2 } from '@polkadot/types/interfaces'
import BN from 'bn.js';
import {
  web3Enable,
  isWeb3Injected,
  web3Accounts,
} from '@polkadot/extension-dapp'

import type { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types'
import { send } from 'process'

// local
const WS_PROVIDER = 'ws://127.0.0.1:9944'

// shibuya
//const WS_PROVIDER = 'wss://shibuya-rpc.dwellir.com'

// shiden
//const WS_PROVIDER = 'wss://shiden-rpc.dwellir.com'
//const WS_PROVIDER = 'wss://shiden.api.onfinality.io/public-ws'

const proofSize = 131072
const refTime = 6219235328
const storageDepositLimit = null





export const AppHeader = () => {
  const { pathname } = useRouter()
  //const { account } = useWallet()
  //const { data: user } = useUserData()
  const [isSetingsOpen, setIsSettingsOpen] = useState(false)
  const { open: openRewardModal } = useRewardModal()
  const { open: openWalletModal } = useWalletModal()
  const { open: openGasSettingsModal } = useGasSettingsModal()
  const { data: layPriceInUSD } = useLAYPrice()

  //☆add
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState<string>('')
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([])
  const [extensions, setExtensions] = useState<InjectedExtension[]>([])


// load Substrate wallet and set the signer
  const initSubstrateProvider = useCallback(async () => {
    if (!isWeb3Injected) {
      throw new Error('The user does not have any Substrate wallet installed')
    }

  const extensions = await web3Enable('Flipper UI')

  if (extensions.length > 0) {
    setExtensions(extensions)
  }

  // set the first wallet as the signer (we assume there is only one wallet)
  // wallet.substrate.setSigner(extensions[0].signer)

  const injectedAccounts = await web3Accounts()

  if (injectedAccounts.length > 0) {
    setAccounts(injectedAccounts)
  }
}, [])

const handleOnSelect = async (event: any) => {
  setAccount(event.target.value)
}
  return (
    <AppHeaderWrapper>
       {/* <div>
          <button onClick={initSubstrateProvider}>Load Wallets</button><br />
          </div>
          <div>
          <select onChange={handleOnSelect}>
            <option value="">Select Address</option>
            {accounts.map(account => (
              <option key={account.address} value={account.address}>{account.meta.name} {account.address}</option>
            ))}
          </select>
        </div> */}
    </AppHeaderWrapper>
  )
}


const MenuButton = styled.button`
  ${flexCenter};
  padding: 12px 20px;
  border-radius: 4px;
  backdrop-filter: blur(16px) brightness(1.16);
  background-color: rgba(255, 255, 255, 0.16);
  column-gap: 8px;
`
const MenuButtonSmall = styled(MenuButton)`
  padding: 12px;
`

const Menu = styled.div`
  display: flex;
  column-gap: 12px;
  > * {
    position: relative;
  }
`
const SettingsDiv = styled.div`
  > a,
  button {
    display: block;
    padding: 12px 16px;
    white-space: nowrap;
    background-color: ${darkGray};
    line-height: 1;
    transition: color 0.15s ease-in;
    :hover {
      color: ${purple};
    }
  }
`

const SettingsContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  border-radius: 4px;
  overflow: hidden;
  transition: visibility, opacity, 0.2s ease-in;
  visibility: hidden;
  opacity: 0;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`

const activeStyle = css`
  color: ${purple};
  :after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4px;
    height: 1px;
    border-bottom: 1px solid;
  }
`
const Tab = styled.div<{ $active?: boolean }>`
  position: relative;
  font-size: 16px;
  font-weight: ${fontWeightHeavy};
  ${({ $active }) => $active && activeStyle}
`

const Nav = styled.nav`
  ${flexCenter};
  column-gap: 32px;
`

const LogoLink = styled(IconLink)`
  display: block;
  height: 32px;
  :hover {
    color: ${trueWhite};
  }
  svg {
    height: 32px;
    width: 100px;
  }
`

const AppHeaderWrapper = styled(HeaderWrapper)`
  > {
    :first-child {
      flex: 1;
      > :last-child {
        margin-right: auto;
      }
    }
    :last-child {
      flex: 1;
      > :first-child {
        margin-left: auto;
      }
    }
  }
`
