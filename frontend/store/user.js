import { ethers } from 'ethers'
import myCount from '../utils/myCount.json'

export const state = () => ({
  account: '',
  error: '',
  contractAddress: '0xB3D7161f982aE9247DA3f1CB70A943fA4593CA5B'
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
  async getCount({ state, commit, dispatch }) {
    const connectedContract = await dispatch("getContract");
    console.log(await connectedContract.get())
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
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

       //  connectedContract
       return new ethers.Contract(
        state.contractAddress,
        myCount.abi,
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
