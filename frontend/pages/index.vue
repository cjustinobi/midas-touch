<template>
  <div>
    {{account}}
    <button @click.prevent="$store.dispatch('user/getCount')">Get count</button>
    <button @click.prevent="$store.dispatch('user/dec')">DEc</button>
    <button @click.prevent="$store.dispatch('user/inc')">Inc</button>
  </div>
</template>

<script>


  export default {
    methods: {

    },
    computed: {
      account() {
        return this.$store.getters['user/account']
      },
      accountError() {
        return this.$store.getters['user/error']
      }
    },
    mounted() {
      this.$store.dispatch('user/isConnected')
    },
    watch: {
      accountError: {
        handler: function(val) {
          if (val) {
            this.$message.error(val)
          }
        },
        immediate: true
      }
    }
  }
</script>
