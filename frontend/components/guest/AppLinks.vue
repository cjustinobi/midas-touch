<template>
  <nav>
    <ul :class="{'block-element' : showDrawer, 'app-nav': !showDrawer}">
      <li><nuxt-link to="/">Explore</nuxt-link></li>
      <li><nuxt-link to="/">Stats</nuxt-link></li>
      <li><nuxt-link to="/">Resources</nuxt-link></li>
      <li><nuxt-link to="/">Create</nuxt-link></li>
      <li><nuxt-link to="/">
        <img width="30px" src="~/assets/img/user.jpg" alt="">
      </nuxt-link></li>
    </ul>
  </nav>
</template>

<script>


  export default {
    name: 'app-links',

    data() {
      return {
        visible: false,
        address: [],
        counter: 0,
        show: true
      };
    },
    methods: {
      showModal() {
        this.visible = true;
      },
      handleOk(e) {
        console.log(e);
        this.visible = false;
      },
    },
    computed: {
        showDrawer() {
          return this.$store.getters['common/linkDrawer']
        }

    }

  }
</script>

<style scoped>

  #logoutButton{
    color: #b80a0a;
    border: none;
    background: white;
    text-decoration: none;
  }

  .app-nav li{
    float: left ;
    list-style-type: none;
    padding: 0 20px 0 ;
  }

  .app-nav li a{
    color: #b80a0a;
    text-decoration: none;

  }

  .block-element{
    display: none;
  }
  span a{
    color: white;
  }

  .ant-drawer-content-wrapper {
    width: 500px !important;
  }

  @media (max-width: 767px) {
    ul.sidebar-panel-nav {
      list-style-type: none;

    }

    ul.sidebar-panel-nav > li > a {
      text-decoration: none;
      font-size: 1.5rem;
    }

    .block-element{
      display: block;
      list-style-type: none;
      padding: 1rem 0;
    }
    .block-element li a{
      color: red;
    }
    .block-element li{
      padding-bottom: 15px;
    }
    .block-element-block{
      display: block;
      width: 100%;
      color: green;
    }

  }




</style>
