
import {VERSION, USE_VERSION, CHAIN_TYPE} from '../constant'
import {ChainId} from './chainId'

export const ATOM_MAINNET = 'https://cosmos-mainnet-rpc.allthatnode.com:1317'
export const ATOM_MAIN_CHAINID = ChainId.ATOM
export const ATOM_MAIN_EXPLORER = 'https://atomscan.com'

export const ATOM_TESTNET = 'https://sei-chain-incentivized.com/sei-chain-tm/'
export const ATOM_TEST_CHAINID = ChainId.ATOM_TEST
export const ATOM_TEST_EXPLORER = 'https://sei.explorers.guru'

const symbol = 'ATOM'

const bridgeToken = {
  [VERSION.V7]: {
    bridgeInitToken: '',
    bridgeInitChain: ''
  }
}

export default {
  [ATOM_MAIN_CHAINID]: {
    ...bridgeToken[USE_VERSION],
    multicalToken: '',
    v1FactoryToken: '',
    v2FactoryToken: '',
    nodeRpc: ATOM_MAINNET,
    nodeRpcList: [
      ATOM_MAINNET,
      'https://cosmos-mainnet-archive.allthatnode.com:1317',
      'https://cosmos-mainnet-rpc.allthatnode.com:26657',
      'https://cosmos-mainnet-archive.allthatnode.com:26657'
    ],
    chainID: ATOM_MAIN_CHAINID,
    lookHash: ATOM_MAIN_EXPLORER + '/transactions/',
    lookAddr: ATOM_MAIN_EXPLORER + '/accounts/',
    lookBlock: ATOM_MAIN_EXPLORER + '/blocks/',
    explorer: ATOM_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Cosmos',
    networkName: 'Cosmos mainnet',
    networkLogo: 'ATOM',
    type: 'main',
    label: ATOM_MAIN_CHAINID,
    chainType: ATOM_MAIN_CHAINID,
    hotType: CHAIN_TYPE.HOT
  },
  [ATOM_TEST_CHAINID]: {
    ...bridgeToken[USE_VERSION],
    multicalToken: '',
    v1FactoryToken: '',
    v2FactoryToken: '',
    nodeRpc: ATOM_TESTNET,
    nodeRpcList: [
      ATOM_TESTNET,
      'https://cosmos-testnet-rpc.allthatnode.com:1317',
      'https://cosmos-testnet-rpc.allthatnode.com:26657'
    ],
    chainID: ATOM_TEST_CHAINID,
    lookHash: ATOM_TEST_EXPLORER + '/transactions/',
    lookAddr: ATOM_TEST_EXPLORER + '/accounts/',
    lookBlock: ATOM_TEST_EXPLORER + '/blocks/',
    explorer: ATOM_TEST_EXPLORER,
    symbol: symbol,
    name: 'Cosmos',
    networkName: 'Cosmos testnet',
    networkLogo: 'ATOM',
    type: 'test',
    label: ATOM_TEST_CHAINID,
    chainType: ATOM_TEST_CHAINID
  },
}