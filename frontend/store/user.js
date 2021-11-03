import { ethers } from 'ethers'
import Web3 from 'web3'
import abi from '../utils/abi.json'

export const state = () => ({
  account: '',
  error: '',
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
  async testContract({ state, commit, dispatch }) {
    const connectedContract = await dispatch("getContract");
    const res = await connectedContract
    console.log(await res.setRegulator('0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'))
    // console.log(await res.checkRegulator())

  },


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

    try {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      console.log(signer)
       //  connectedContract


      try {
        return new ethers.Contract(state.contractAddress, abi.abi, signer)
        // const data = await contract.checkRegulator()

      } catch (err) {
        console.log("Error: ", err)
      }


       // return new ethers.Contract(state.contractAddress, abi.abi, signer);

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


//
// {hash: "0x85aec4a2e5480d3989d50b23959f75d5e82c1bb5d25eb683ed1ab7e8a61da22e", type: 2, accessList: null, blockHash: null, blockNumber: null, …}
// accessList: null
// blockHash: null
// blockNumber: null
// chainId: 0
// confirmations: 0
// creates: null
// data: "0xcde0a4f800000000000000000000000000000000000c2e074ec69a0dfb2997ba6c7d2e1e"
// from: "0xfCdcB824747B3b8e4058E90a59468eD0ef538Ae9"
// gasLimit: BigNumber {_hex: "0x537c", _isBigNumber: true}
// gasPrice: BigNumber {_hex: "0x59682f14", _isBigNumber: true}
// hash: "0x85aec4a2e5480d3989d50b23959f75d5e82c1bb5d25eb683ed1ab7e8a61da22e"
// maxFeePerGas: BigNumber {_hex: "0x59682f14", _isBigNumber: true}
// maxPriorityFeePerGas: BigNumber {_hex: "0x59682f00", _isBigNumber: true}
// nonce: 57
// r: "0x50f58b90b4048e3a1cd9523d7204e0539b35af2690f00ff3f5dbaf0c932421f7"
// s: "0x64123a82eacc975e046f820fc8b272d14727377ec0a7c831526659d41c0713a1"
// to: "0xf8e81D47203A594245E36C48e151709F0C19fBe8"
// transactionIndex: null
// type: 2
// v: 0

