import { AppBackground } from 'src/components/parts/Background'
import { AppFooter } from 'src/components/parts/Footer'
import { AppHeader } from 'src/components/parts/Header/MyAppHeader'
import { contentMaxWidthCssVar } from 'src/styles/mixins'
import styled from 'styled-components'
import { Market } from './parts/Market'
import { Summary } from './parts/Summary'

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

//import Spinner from './spinner'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
//import abiData from './abi'
//import abiData from './myabi'
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

const address = "XS6uDNeEA5N6qvNXBkdvY1VKfAYSUtrM4KwH2rd3usFa4CY";
//const address = "ab6cMAFjtKAnYnRhKHjmSmwZVoghBTbh6ku9M8oxY9HzB82";//shibuya
//const address = "bDnAheHGy4yMfxCEVaX9QxXQ5CcdGAoqepUk84XwES9P9KZ";//shiden


export const Dashboard = () => {
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
  <>
    {/* <AppHeader /> */}
    <Main>
      <AppBackground />
      {/* <Summary />
      <Market /> */}
    </Main>
    {/* <AppFooter /> */}
  </>
  )
}

const Main = styled.main`
  width: 100%;
  max-width: var(${contentMaxWidthCssVar});
  margin: 0 auto;
  padding-bottom: 160px;
  ${Summary}, ${Market} {
    position: relative;
    margin-top: 80px;
  }
`
