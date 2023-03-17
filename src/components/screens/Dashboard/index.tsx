import { AppBackground } from 'src/components/parts/Background'
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

import Spinner from './spinner'
import Head from 'next/head'
import styles from './Home.module.css'
//import abiData from './abi'
import abiData_gov from './myabi'
import abiData_nst from './myabi2'
import abiData_dao from './myabi3'
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

//GOVTOKEN
const address_gov = "ZH3SFHCGDTNtvJ6rrZoJ4ZKNaauKB4RG4Q1XLBewjjTysnh";
//const address = "ab6cMAFjtKAnYnRhKHjmSmwZVoghBTbh6ku9M8oxY9HzB82";//shibuya
//const address = "bDnAheHGy4yMfxCEVaX9QxXQ5CcdGAoqepUk84XwES9P9KZ";//shiden

//No Sontaku Token
const address_nst = "Xh1g1HAsuPdrMPEPn1CFLEkuZ4vkWKQ3wmPiRLx5sJEYoVV";

//DAO
const address_dao = "aqW1n95sALLMYBepB3kSWWxG39NyqJyWTzDeXjnt5EytTwC";

const Dashboard: NextPage = () => {
  // const [address, setAddress] = useState('')
  // const [addressSubmitted, setAddressSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState<string>('')
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([])
  const [extensions, setExtensions] = useState<InjectedExtension[]>([])
  //for No Sontaku DAO
  const [govTokenValue, setGovTokenValue] = useState(0)
  const [noSontakuValue, setNoSontakuValue] = useState(0)
  const [rows, setRows] = useState([
    { ID: 0, description: 'a', status:'', result:'' },
    { ID: 1, description: 'a', status:'', result:'' },
    { ID: 2, description: 'a', status:'', result:'' },
    { ID: 3, description: 'a', status:'', result:'' },
    { ID: 4, description: 'a', status:'', result:'' },
    { ID: 5, description: 'a', status:'', result:'' },
    { ID: 6, description: 'a', status:'', result:'' },
    { ID: 7, description: 'a', status:'', result:'' },
    { ID: 8, description: 'a', status:'', result:'' },
    { ID: 9, description: 'a', status:'', result:'' },
  ])

  useEffect(() => {
  }, []);

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
    //Get token hold
    const provider = new WsProvider(WS_PROVIDER)
    const api = new ApiPromise({ provider })
    await api.isReady
    api.setSigner(extensions[0].signer)
    const abi = new Abi(abiData_gov, api.registry.getChainProperties())
    const contract = new ContractPromise(api, abi, address_gov)
    queryGovToken(api,contract,address_gov,event.target.value);

    const abi2 = new Abi(abiData_nst, api.registry.getChainProperties())
    const contract2 = new ContractPromise(api, abi2, address_nst)
    queryNSTToken(api,contract2,address_nst,event.target.value);
  }

  //claim(mint) gov token
  const initialClaim = async () => {
    console.log("initialClaim")
    const provider = new WsProvider(WS_PROVIDER)
    const api = new ApiPromise({ provider })
  
    await api.isReady
  
    api.setSigner(extensions[0].signer)
  
    console.log('API is ready')
  
    const abi = new Abi(abiData_gov, api.registry.getChainProperties())
  
    const contract = new ContractPromise(api, abi, address_gov)
  
    const { gasRequired, result, output } = await contract.query["psp22Mintable::mint"](
      address_gov,
      {
        gasLimit: api.registry.createType('WeightV2', {
          refTime,
          proofSize,
        }) as WeightV2,
        storageDepositLimit,
      },account, 100
  
    )
  
    const gasLimit = api.registry.createType('WeightV2', gasRequired) as WeightV2
  
    setLoading(true)
  
    // Send the transaction, like elsewhere this is a normal extrinsic
    // with the same rules as applied in the API (As with the read example,
    // additional params, if required can follow)
    try {
      await contract.tx
      ["psp22Mintable::mint"]({
          gasLimit: gasLimit,
          storageDepositLimit
        },account, 100)//newvalue:convert to max decimal
        .signAndSend(account, async (res) => {
          if (res.status.isInBlock) {
            console.log('in a block')
            setLoading(false)
          } else if (res.status.isFinalized) {
            console.log('finalized')
          }
        })
        window.setTimeout(function(){
          queryGovToken(api,contract,address_gov,account);
        },2000);
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  const queryGovToken = async (api: ApiPromise, contract: ContractPromise, address: string, account: string) => {
    // (We perform the send from an account, here using Alice's address)
    const { gasRequired, result, output } = await contract.query['psp22::balanceOf'](
      address_gov,
      {
        gasLimit: api.registry.createType('WeightV2', {
          refTime,
          proofSize,
        }) as WeightV2,
        storageDepositLimit,
      },account
    )

    // const result = await api.call.contractsApi.call(address, contract.address, 0, null, null, msg.toU8a(msg.args.map((_) => account.address)))

    // The actual result from RPC as `ContractExecResult`
    console.log(result.toHuman())

    // the gas consumed for contract execution
    console.log(gasRequired.toHuman())

    // check if the call was successful
    if (result.isOk) {
      // output the return value
      console.log('Success', output?.toHuman())

      if (output) {
        setGovTokenValue(Number(output))
      }
    } else {
      console.error('Error', result.asErr)
    }
  }

  const queryNSTToken = async (api: ApiPromise, contract: ContractPromise, address: string, account: string) => {
    // (We perform the send from an account, here using Alice's address)
    const { gasRequired, result, output } = await contract.query['psp22::balanceOf'](
      address_nst,
      {
        gasLimit: api.registry.createType('WeightV2', {
          refTime,
          proofSize,
        }) as WeightV2,
        storageDepositLimit,
      },account
    )

    // const result = await api.call.contractsApi.call(address, contract.address, 0, null, null, msg.toU8a(msg.args.map((_) => account.address)))

    // The actual result from RPC as `ContractExecResult`
    console.log(result.toHuman())

    // the gas consumed for contract execution
    console.log(gasRequired.toHuman())

    // check if the call was successful
    if (result.isOk) {
      // output the return value
      console.log('Success', output?.toHuman())

      if (output) {
        setNoSontakuValue(Number(output))
      }
    } else {
      console.error('Error', result.asErr)
    }
  }

  const queryProposal = async (api: ApiPromise, contract: ContractPromise, address: string, account: string) => {
    // (We perform the send from an account, here using Alice's address)
    const { gasRequired, result, output } = await contract.query['psp22::balanceOf'](
      address_nst,
      {
        gasLimit: api.registry.createType('WeightV2', {
          refTime,
          proofSize,
        }) as WeightV2,
        storageDepositLimit,
      },account
    )

    // const result = await api.call.contractsApi.call(address, contract.address, 0, null, null, msg.toU8a(msg.args.map((_) => account.address)))

    // The actual result from RPC as `ContractExecResult`
    console.log(result.toHuman())

    // the gas consumed for contract execution
    console.log(gasRequired.toHuman())

    // check if the call was successful
    if (result.isOk) {
      // output the return value
      console.log('Success', output?.toHuman())

      if (output) {
        setNoSontakuValue(Number(output))
      }
    } else {
      console.error('Error', result.asErr)
    }
  }

  //make proposal row for table

  // for (let i = 0; i < 10; i++) {
  //   setRows([...rows,
  //     "<tr key={i}>
  //       <td className={styles.thtd}>{i}</td>
  //       <td className={styles.thtd}>Record {i}</td>
  //       <td className={styles.thtd}>Record {i}</td>
  //       <td className={styles.thtd}>Record {i}</td>
  //     </tr>
  //   "]);
  // }


  
  return (
    <div className={styles.container}>
      <Head>
        <title>No Sontaku DAO</title>
        <meta name='description' content='No Sontaku DAO' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {loading ? <Spinner /> : null }

      <main className={styles.main}>
          <h3 className={styles.title}>
          No Sontaku DAO
          </h3><br/>
          
          <div>
          <button className={styles.btnflatborder} onClick={initSubstrateProvider}>Load Wallets</button><br />
          </div>
          <div className={styles.selectdiv}>
          <select onChange={handleOnSelect}>
            <option value="">Select Address</option>
            {accounts.map(account => (
              <option key={account.address} value={account.address}>{account.meta.name} {account.address}</option>
            ))}
          </select></div><br />
            
          <h2 className={styles.underline}>初めての方&#40;For New Commer&#41;</h2>
          <div>
          <button className={styles.btnflatborder} onClick={initialClaim}>ガバナンストークンをゲット！&#40;Get Govornance Token&#41;</button><br />
          </div><br/>
          <h2 className={styles.underline}>あなたの保有トークン&#40;Your Tokens&#41;</h2>
          <div>
            <table className={styles.tablecss}>
              <tr className={styles.thtd}>
                <td className={styles.thtd}>Governance Token</td><td className={styles.thtd}>GOV</td><td className={styles.thtd}>{govTokenValue}</td>
              </tr>
              <tr className={styles.thtd}>
                <td className={styles.thtd}>No Sontaku Token</td><td className={styles.thtd}>NSK</td><td className={styles.thtd}>{noSontakuValue}</td>
              </tr>
            </table>
          </div>

          <br/>
          <br/>
          <h2 className={styles.underline}>カイゼン提案一覧&#40;Kaizen Proposal&#41;</h2>  
          <div>
              <table className={styles.tablecss}>
              <thead>
                <tr className={styles.thtd}>
                  <th className={styles.thtd}>ID</th>
                  <th className={styles.thtd}>description</th>
                  <th className={styles.thtd}>status</th>
                  <th className={styles.thtd}>result</th>
                </tr>
              </thead>
              <tbody>
              {rows.map((item) => (
                <tr className={styles.thtd} key={item.ID}>
                  <td className={styles.thtd}>{item.description}</td>
                  <td className={styles.thtd}>{item.status}</td>
                  <td className={styles.thtd}>{item.result}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
      </main>
    </div>
  )
}

export default Dashboard