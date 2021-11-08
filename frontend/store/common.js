
export const state = () => ({
  linkDrawer: false,
  cartDrawer: false,
})

export const mutations = {
  TOGGLE_LINKDRAWER(state) {
    state.linkDrawer = !state.linkDrawer
  },
  TOGGLE_CARTDRAWER(state) {
    state.linkDrawer = false
    state.cartDrawer = !state.cartDrawer
  },
  OPEN_CARTDRAWER(state) {
    state.linkDrawer = false
    state.cartDrawer = true
  },
}

export const getters = {
  linkDrawer: state => state.linkDrawer,
  cartDrawer: state => state.cartDrawer,
}
