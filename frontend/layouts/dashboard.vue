<template>
  <div class="page-wrapper chiller-theme toggled">
    <a id="show-sidebar" class="btn btn-sm btn-dark" href="#">
      <i class="fas fa-bars"></i>
    </a>
    <Component :is="sidebar" />
    <main class="page-content">
      <div class="container">
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import dashboardInit from '@/mixins/dashboardInit'

  export default {
    middleware: 'auth',
    mixins: [dashboardInit],
    computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser']),
      sidebar() {
        return `dashboard-${this.$auth.user.role}-sidebar`
      }
    },
    watch: {
      '$route': function () {
        if(window.innerWidth < 767) {
          $(".page-wrapper").removeClass("toggled");
        }
      }
    },
    beforeDestroy() {

      localStorage.setItem('test2', 'test valueeeee')
    }
  }


</script>

<style>
  @import "assets/css/dashboard.css";
</style>

