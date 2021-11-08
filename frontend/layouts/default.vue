<template>
  <div>
    <GuestAppHeader />
    <main>
      <Nuxt />
    </main>

    <GuestMobileLinks />

<!--    <GuestAppFooter />-->
  </div>
</template>


<script>
export default {
  methods: {

  },
}
</script>

<style scoped>
  main {
    margin-top: 100px;
  }
  @media (max-width: 767px) {
    main {
      margin-top: 47px;
    }
  }
</style>
