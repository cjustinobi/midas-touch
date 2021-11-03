<template>
  <div class="container">
    <div class="desc">
      <span>Use</span> <br> <span>the</span> <br> <span>money</span> <br> <span>of</span> <br> <span>the</span> <br> <span>future</span> <br> <span>now</span>
    </div>
    <div class="right-items">
      <div class="learn">
        <h1>LEARN</h1>
      </div>
      <div class="invest">
        <h1>INVEST</h1>
      </div>
      <div class="play">
        <h1>PLAY</h1>
      </div>
    </div>

    <button @click.prevent="$store.dispatch('user/testContract')">Test Contract</button>
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

<style scoped>
  .container {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .desc {
    display: grid;
    background: grey;
    justify-items: center;
    align-content: center;
  }
  .desc span {
    background: #BCF3CE;
    width: min-content;
    padding: 3px 6px;
    font-size: 22px;
  }
  .right-items {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    align-content: center;
  }
  .learn, .invest, .play{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .learn h1, .invest h1, .play h1 {
    color: #fefefe;
    font-weight: 700;
  }
  .learn {
    background: #262525;
  }
  .invest {
    background: #2A6F75;
  }
  .play {
    background: #32254A;
  }
</style>
