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
// const { options } = require('@laminar/api');
// options.set({ log: 'debug' });

// local
//const WS_PROVIDER = 'ws://127.0.0.1:9944'

// shibuya
//const WS_PROVIDER = 'wss://shibuya-rpc.dwellir.com'

// shiden
//const WS_PROVIDER = 'wss://shiden-rpc.dwellir.com'
const WS_PROVIDER = 'wss://shiden.api.onfinality.io/public-ws'

const proofSize = 131072
const refTime = 6219235328
const storageDepositLimit = null

//GOVTOKEN
//const address_gov = "ZH3SFHCGDTNtvJ6rrZoJ4ZKNaauKB4RG4Q1XLBewjjTysnh";
//const address = "ab6cMAFjtKAnYnRhKHjmSmwZVoghBTbh6ku9M8oxY9HzB82";//shibuya
const address = "b4Cg8RiW3fZ5jD8FPmPwZXSHtmcGWi9eFac8M6K7s46utMu";//shiden

//No Sontaku Token
//const address_nst = "YdypW2eBQg3A4nXmGeWp6dnUbdMDswa1XjmBeGbwrkpxEQZ";
const address_nst = "agwtJv4W3mqd6c3Wi1QYnn7pVsYJGwb7LHaJQrzMjzLTHnG";//shiden
//DAO
//const address_dao = "a2kqvEc3wnTGezPaL3d8M3i3tqjPTyzL7E9WrcZrVsTqk8s";
const address_dao = "bM2fvvgm6gAKbQNqxwJjo5vwmPVjkSDiBV5WxpMjTcVQXX5";//shiden

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
    { ID: 0, description: '', excuted:false, to:'', voteStart:'', voteEnd:''},
    { ID: 1, description: '', excuted:false, to:'', voteStart:'', voteEnd:''},
    { ID: 2, description: '', excuted:false, to:'', voteStart:'', voteEnd:''},
    { ID: 3, description: '', excuted:false, to:'', voteStart:'', voteEnd:''},
    { ID: 4, description: '', excuted:false, to:'', voteStart:'', voteEnd:''},
    { ID: 5, description: '', excuted:false, to:'', voteStart:'', voteEnd:''},
    { ID: 6, description: '', excuted:false, to:'', voteStart:'', voteEnd:''},
    { ID: 7, description: '', excuted:false, to:'', voteStart:'', voteEnd:''},
    { ID: 8, description: '', excuted:false, to:'', voteStart:'', voteEnd:''},
    { ID: 9, description: '', excuted:false, to:'', voteStart:'', voteEnd:''},
  ])

  const [number, setNumber] = useState("0");
  const [opinion, setOpinion] = useState("agree");
  const [point, setPoint] = useState("yes");
  const [proposetext, setProposetext] = useState("");
  const [endNumber, setEndNumber] = useState("0");


  const handleNumberChange = (event:any) => {
    setNumber(event.target.value);
  };

  const handleOpinionChange = (event:any) => {
    setOpinion(event.target.value);
  };

  const handlePointChange = (event:any) => {
    setPoint(event.target.value);
  };

  const handleProposetextChange = (event:any) => {
    setProposetext(event.target.value);
  };

  const handleEndNumberChange = (event:any) => {
    setEndNumber(event.target.value);
  };


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

    queryAllProposals();
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

  //query one proposal
  const queryOneProposal = async (api: ApiPromise, contract: ContractPromise, address: string, index: number) => {
    const { gasRequired, result, output } = await contract.query.getProposal(
      address_dao,
      {
        gasLimit: api.registry.createType('WeightV2', {
          refTime,
          proofSize,
        }) as WeightV2,
        storageDepositLimit,
      },index
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
      return output?.toHuman()
    } else {
      console.error('Error', result.asErr)
    }
  }

  //query All Proposals(proto ver: limit 10)
  const queryAllProposals = async () => {

    const provider = new WsProvider(WS_PROVIDER)
    const api = new ApiPromise({ provider })
    await api.isReady
    api.setSigner(extensions[0].signer)
    const abi = new Abi(abiData_dao, api.registry.getChainProperties())
    const contract = new ContractPromise(api, abi, address_dao)    

    let updatedRows = rows
    for (let i = 0; i < 10; i++) {
      //make updatedRows (query 10 proposals)
      let proposal= await queryOneProposal(api,contract,address_dao,i)
   
      if(proposal != null){
        if(typeof proposal === 'object' && 'to' in proposal){
          const description = proposal.description as string
          const excuted = proposal.excuted as boolean
          const to = proposal.to as string
          const voteStart = proposal.voteStart as string
          const voteEnd = proposal.voteEnd as string

          updatedRows = updatedRows.map((element) => {
            if (element.ID === i) {
              return { ...element, ID:i, description:description, excuted:excuted, to:to, voteStart:voteStart, voteEnd:voteEnd};
            } else {
              return element;
          }
          })
        }
      }
    }
    setRows(updatedRows);
  }
  
  //vote
  const CarryOnVote = async () => {
    console.log("CarryOnVote")
    const provider = new WsProvider(WS_PROVIDER)
    const api = new ApiPromise({ provider })
  
    await api.isReady
    api.setSigner(extensions[0].signer)
    console.log('API is ready')
    const abi = new Abi(abiData_dao, api.registry.getChainProperties())
    const contract = new ContractPromise(api, abi, address_dao)

    let voteType = 0
    let evalType = 0
    if(opinion == "agree"){
      voteType = 1;
    }else{
      voteType = 0;
    }

    if(point == "yes"){
      evalType = 1;
    }else{
      evalType = 0;
    }

    const { gasRequired, result, output } = await contract.query.vote(
      address_dao,
      {
        gasLimit: api.registry.createType('WeightV2', {
          refTime,
          proofSize,
        }) as WeightV2,
        storageDepositLimit,
      },number, voteType, evalType
  
    )

    //const gasLimit = api.registry.createType('WeightV2', gasRequired) as WeightV2
    const gasLimit = 30000 * 10000000;
  
    setLoading(true)
    console.log(gasLimit)
    // Send the transaction, like elsewhere this is a normal extrinsic
    // with the same rules as applied in the API (As with the read example,
    // additional params, if required can follow)
    console.log(number)
    console.log(voteType)
    console.log(evalType)

    try {
      await contract.tx
      .vote({
          gasLimit: gasLimit,
          storageDepositLimit
        },number, voteType, evalType)
        .signAndSend(account, async (res) => {
          if (res.status.isInBlock) {
            console.log('in a block')
            setLoading(false)
          } else if (res.status.isFinalized) {
            console.log('finalized')
          }
        })
        
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

//Carry on vote
const CarryOnPropose = async () => {
  console.log("CarryOnPropose")
  const provider = new WsProvider(WS_PROVIDER)
  const api = new ApiPromise({ provider })

  await api.isReady

  api.setSigner(extensions[0].signer)

  console.log('API is ready')

  const abi = new Abi(abiData_dao, api.registry.getChainProperties())

  const contract = new ContractPromise(api, abi, address_dao)

  const { gasRequired, result, output } = await contract.query.propose(
    address_dao,
    {
      gasLimit: api.registry.createType('WeightV2', {
        refTime,
        proofSize,
      }) as WeightV2,
      storageDepositLimit,
    },account, 100000, proposetext

  )

  const gasLimit = api.registry.createType('WeightV2', gasRequired) as WeightV2

  setLoading(true)

  // Send the transaction, like elsewhere this is a normal extrinsic
  // with the same rules as applied in the API (As with the read example,
  // additional params, if required can follow)
  try {
    await contract.tx
    .propose({
        gasLimit: gasLimit,
        storageDepositLimit
      },account, 100000, proposetext)
      .signAndSend(account, async (res) => {
        if (res.status.isInBlock) {
          console.log('in a block')
          setLoading(false)
        } else if (res.status.isFinalized) {
          console.log('finalized')
        }
      })
      window.setTimeout(function(){
        queryAllProposals();
      },2000);
  } catch (e) {
    console.error(e)
    setLoading(false)
  }
}

//Carry on Execute
const CarryOnExecute = async () => {
  console.log("CarryOnExecute")
  const provider = new WsProvider(WS_PROVIDER)
  const api = new ApiPromise({ provider })

  await api.isReady

  api.setSigner(extensions[0].signer)

  console.log('API is ready')

  const abi = new Abi(abiData_dao, api.registry.getChainProperties())

  const contract = new ContractPromise(api, abi, address_dao)

  const { gasRequired, result, output } = await contract.query.execute(
    address_dao,
    {
      gasLimit: api.registry.createType('WeightV2', {
        refTime,
        proofSize,
      }) as WeightV2,
      storageDepositLimit,
    },endNumber

  )

  const gasLimit = api.registry.createType('WeightV2', gasRequired) as WeightV2

  setLoading(true)

  // Send the transaction, like elsewhere this is a normal extrinsic
  // with the same rules as applied in the API (As with the read example,
  // additional params, if required can follow)
  try {
    await contract.tx
    .execute({
        gasLimit: gasLimit,
        storageDepositLimit
      },endNumber)
      .signAndSend(account, async (res) => {
        if (res.status.isInBlock) {
          console.log('in a block')
          setLoading(false)
        } else if (res.status.isFinalized) {
          console.log('finalized')
        }
      })
      window.setTimeout(function(){
        queryAllProposals();
      },2000);
  } catch (e) {
    console.error(e)
    setLoading(false)
  }
}


  return (
    <><h3 className={styles.title}>
      No Sontaku DAO
    </h3><br />
          
          <div className={styles.topbutton}>
          <button className={styles.btnflatborder} onClick={initSubstrateProvider}>Load Wallets</button><br />
          </div>
          <div className={`${styles.selectdiv} ${styles.sl01}`}>
            <select onChange={handleOnSelect}>
              <option value="">Select Address</option>
              {accounts.map(account => (
                <option key={account.address} value={account.address}>{account.meta.name} {account.address}</option>
              ))}
            </select>
      </div>
      <br />
    
    <div className={styles.container}>
        <Head>
          <title>No Sontaku DAO</title>
          <meta name='description' content='No Sontaku DAO' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        {loading ? <Spinner /> : null}

        <main className={styles.main}>


       

          <h2 className={styles.underline}>初めての方&#40;For New Commer&#41;</h2>
          <div>
            <button className={styles.btnflatborder} onClick={initialClaim}>ガバナンストークンをゲット！&#40;Get Govornance Token&#41;</button><br />
          </div><br />
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

          <br />
          <br />
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
                    <td className={styles.thtd}>{item.ID}</td>
                    <td className={styles.thtd}>{item.description}</td>
                    <td className={styles.thtd}>{item.excuted ? 'End' : (item.voteStart ? 'Ongoing' : '')}</td>
                    <td className={styles.thtd}></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div><br/><br/>
          <h2 className={styles.underline}>投票&#40;Vote 🚀&#41;</h2>
          <br />
          <div>
            <label>
              投票する提案IDを選択&#40;select Proposal ID&#41;:
              <div className={`${styles.selectdiv} ${styles.sl01}`}>
                <select value={number} onChange={handleNumberChange}>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i.toString()}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="opinion"
                    value="agree"
                    checked={opinion === "agree"}
                    onChange={handleOpinionChange} />
                  賛成&#40;For&#41;
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="opinion"
                    value="disagree"
                    checked={opinion === "disagree"}
                    onChange={handleOpinionChange} />
                  反対&#40;Against&#41;
                </label>
              </div>
            </label>
            <br />
            <label>
              忖度なき提案を讃え、ポイントを送りますか？<br />
              &#40;Would you like to praise unbiased proposals and send points?&#41;
              <div>
                <label>
                  <input
                    type="radio"
                    name="point"
                    value="yes"
                    checked={point === "yes"}
                    onChange={handlePointChange} />
                  贈る&#40;send&#41;
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="point"
                    value="no"
                    checked={point === 'no'}
                    onChange={handlePointChange} />
                  贈らない&#40;not send&#41;
                </label>
              </div>
            </label>
            <br />
            <button className={styles.btnflatborder} onClick={CarryOnVote}>投票する！&#40;vote!!&#41;</button><br />
          </div>
          <br></br>
          <h2 className={styles.underline}>提案&#40;Propose 🙋‍♀️&#41;</h2>
          <div>
            <input className={styles.inputtext}
              type="text"
              placeholder="English only"
              value={proposetext}
              onChange={handleProposetextChange} /><br /><br />
            <button className={styles.btnflatborder} onClick={CarryOnPropose}>提案する！&#40;propose!!&#41;</button>

          </div><br /><br />

          <h2 className={styles.underline}>投票を終了する&#40;Execute👋&#41;</h2>
          <div>
            <label>
              終了する提案IDを選択&#40;select Proposal ID&#41;:
              <div className={`${styles.selectdiv} ${styles.sl01}`}>
                <select value={endNumber} onChange={handleEndNumberChange}>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i.toString()}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <button className={styles.btnflatborder} onClick={CarryOnExecute}>終了する&#40;propose!!&#41;</button>
          </div>
        </main>
      </div></>
  )
}

export default Dashboard