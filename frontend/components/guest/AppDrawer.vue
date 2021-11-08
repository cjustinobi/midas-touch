<template>
  <div class="sidebar">
   
    <a-drawer
      title="Foodie"
      :placement="placement"
      :closable="false"
      :visible="linkDrawer"
      @close="$store.commit('common/TOGGLE_LINKDRAWER')"
    >
      <AppLinks :showDrawer="showDrawer" />
    </a-drawer>
  </div>
</template>
<script>
  import AppLinks from '@/components/guest/AppLinks'
  export default {
    data(){
      return {
        placement: 'left'
      }
    },
    props: ['showDrawer'],
    components: {
      AppLinks
    },
    computed: {
        linkDrawer() {
          return this.$store.getters['common/linkDrawer']
        }
        
    }
  }
</script>
<style>

  @media screen and (max-width: 600px) {
    .slide-enter-active,
    .slide-leave-active
    {
      transition: transform 0.8s ease;
    }

    .slide-enter,
    .slide-leave-to {
      transform: translateX(-100%);
      transition: all 150ms ease-in 0s
    }

    .sidebar-backdrop {
      background-color: white;
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      cursor: pointer;
    }

    .sidebar-panel {
      overflow-y: auto;
      background-color: rgb(61, 58, 58);
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      z-index: 999;
      padding: 3rem 20px 2rem 20px;
      width: 250px;
    }
  }

</style>
