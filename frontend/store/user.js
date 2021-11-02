import { ethers } from 'ethers'
import Web3 from 'web3'
import abi from '../utils/abi.json'

export const state = () => ({
  account: '',
  error: '',
  // contractAddress: '0xd9145CCE52D386f254917e481eB44e9943F39138'
  contractAddress: '0xf8e81D47203A594245E36C48e151709F0C19fBe8'
})

export const mutations = {

  SET_ACCOUNT(state, account) {
    state.account = account
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

export const actions = {
  async previousOwner({ state, commit, dispatch }) {
    const connectedContract = await dispatch("getContract");
    console.log(await connectedContract)
    // console.log(await connectedContract.setRegulator())
    // console.log(await connectedContract.setRegulator(0xd9145CCE52D386f254917e481eB44e9943F39138));


  },
  // 0xd9145CCE52D386f254917e481eB44e9943F39138

  async inc({ state, commit, dispatch }) {
    const connectedContract = await dispatch("getContract");
    await connectedContract.inc()
    console.log(await connectedContract.get())
  },

  async dec({ state, commit, dispatch }) {
    const connectedContract = await dispatch("getContract");
    await connectedContract.dec()
    console.log(await connectedContract.get())
  },

  async isConnected({ commit, dispatch }) {
    const accounts = window.ethereum ? await window.ethereum.request({ method: 'eth_accounts' }) : []
    if (accounts.length) {
      return commit('SET_ACCOUNT', accounts[0])
    }
    dispatch('connect')
  },

  async connect( { commit, dispatch }) {

    if (!window.ethereum) {
      return commit('SET_ERROR', 'MetaMask not installed')
    }

    const { ethereum } = window
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })
    commit('SET_ACCOUNT', accounts[0])
    await dispatch('checkNetwork')
  },

  async checkNetwork({ commit, dispatch }) {
    let chainId = await ethereum.request({ method: 'eth_chainId' })
    const rinkebyChainId = '0x4'
    if (chainId !== rinkebyChainId) {
      if (!(await dispatch('switchNetwork'))) {
        commit('SET_ERROR', 'You are not connected to the Rinkeby Test Network!')
      }
    }
  },
  async switchNetwork() {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x4' }],
      })

      return 1
    } catch (switchError) {
      return 0
    }
  },

  async getContract({ state }) {

//       const RPC_ENDPOINT = 'https://ropsten.infura.io/v3/e3c79efae42947f98972c00cad1bb3d5'
//     let web3 = new Web3(new Web3.providers.HttpProvider(RPC_ENDPOINT));
//       let address = '0xf8e81D47203A594245E36C48e151709F0C19fBe8'
//
//     web3.eth.defaultAccount = web3.eth.accounts[0]
//
//     var SimpleStorageContract = web3.eth.contract(abi.abi);
//
//     var simpleStorageContractInstance = SimpleStorageContract.at(address);
// return console.log(simpleStorageContractInstance.checkRegulator())

    // 02ed88b5c5cf0a2a99bc20cbe49b1381abf646271f14129b90aeed9b07df7c29
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      // const provider = new ethers.providers.JsonRpcProvider();
      const signer = await provider.getSigner();
// return console.log(await signer.provider.getCode('hjkkhk'))
       //  connectedContract
       return new ethers.Contract(
        state.contractAddress,
        abi.abi,
        signer
      );

    } catch (error) {
      console.log(error);
      console.log("connected contract not found");
      return null;
    }
  },
}

export const getters = {
  account: state => state.account,
  error: state => state.error,
}
