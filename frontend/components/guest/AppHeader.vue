<template>
  <header id="header" style="background-color: white;" class="app-padding fixed-top">
    <div :class="{ 'active' :  active }" @click.prevent="showDrawer">
      <button type="button" class="burger-button" title="Menu">
        <span class="burger-bar burger-bar--1"></span>
        <span class="burger-bar burger-bar--2"></span>
        <span class="burger-bar burger-bar--3"></span>
      </button>
    </div>

    <GuestAppDrawer :showDrawer="isBurgerActive" />

    <a-row type="flex" justify="space-between" id="nav-list">
      <div id="image-logo">
        <a-col>
          <img class="logo" src="~/assets/img/logo.png">
        </a-col>
      </div>
      <a-col class="app-links">
        <GuestAppLinks />
      </a-col>
    </a-row>
  </header>
</template>
<script>

  export default {
    data() {
      return {
        isBurgerActive: false,
      }
    },
    methods: {
      toggle() {
        this.isBurgerActive = !this.isBurgerActive
      },
      showDrawer() {
      this.$store.commit('common/TOGGLE_LINKDRAWER')
    },
    },
    computed: {
      active() {
        return this.$store.getters['common/linkDrawer']
      }
    }
  }
</script>
<style>

  #header {
    transition: all 0.5s;
    z-index: 997;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  #header.header-scrolled, #header.header-inner-pages {
    background: #fefefe;
    box-shadow: 0 0 22px rgb(0 0 0 / 10%);
    color: var(--mute_txt);
  }

  .logo{
    width: 50px;
  }


  .burger-button {
    display: none;
  }

  @media only screen  and (max-width: 767px) {
    #header{
      padding: 10px 20px;
    }


    .burger-button {
      position: relative;
      height: 50px;
      width: 35px;
      display: block;
      z-index: 999;
      border: 0;
      border-radius: 0;
      background-color: transparent;
      /* pointer-events: all; */
      transition: transform .6s cubic-bezier(.165,.84,.44,1);
      float: right;
    }
    .hidden {
      visibility: hidden;
    }

    button {
      cursor: pointer;
    }

    /* remove blue outline */
    button:focus {
      outline: 0;
    }

    .burger-bar {
      background-color: #130f40;
      position: absolute;
      top: 50%;
      right: 6px;
      left: 6px;
      height: 2px;
      width: auto;
      margin-top: -1px;
      transition: transform .6s cubic-bezier(.165,.84,.44,1),opacity .3s cubic-bezier(.165,.84,.44,1),background-color .6s cubic-bezier(.165,.84,.44,1);
    }

    .burger-bar--1 {
      -webkit-transform: translateY(-6px);
      transform: translateY(-6px);
    }

    .burger-bar--2 {
      transform-origin: 100% 50%;
      transform: scaleX(.8);
    }

    .burger-button:hover .burger-bar--2 {
      transform: scaleX(1);
    }

    .no-touchevents .burger-bar--2:hover {
      transform: scaleX(1);
    }

    .burger-bar--3 {
      transform: translateY(6px);
    }

    #burger.active .burger-button {
      transform: rotate(-180deg);
    }

    #burger.active .burger-bar {
      background-color: black;
    }

    #burger.active .burger-bar--1 {
      transform: rotate(45deg)
    }

    #burger.active .burger-bar--2 {
      opacity: 0;
    }

    #burger.active .burger-bar--3 {
      transform: rotate(-45deg)
    }
    .app-links {
      display: none;
    }

  }

</style>
