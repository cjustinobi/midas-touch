<template>
  <a-result v-if="error.statusCode === 404" status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary" @click="$router.push('/home')">
        Back Home
      </a-button>
    </template>
  </a-result>
  <a-result v-else-if="error.statusCode === 500" status="500" title="500" sub-title="Sorry, the server is wrong.">
    <template #extra>
      <a-button type="primary" @click="$router.push('/home')">
        Back Home
      </a-button>
    </template>
  </a-result>
  <a-result
    v-else-if="error.statusCode === 403 || error.statusCode === 401"
    status="403"
    title="403"
    sub-title="Sorry, you are not authorized to access this page."
  >
    <template #extra>
      <a-button type="primary" @click="$router.push('/home')">
        Back Home
      </a-button>
    </template>
  </a-result>
  <a-result v-else status="500" title="500" sub-title="Sorry, the server is wrong.">
    <template #extra>
      <a-button type="primary" @click="$router.push('/home')">
        Back Home
      </a-button>
    </template>
  </a-result>
</template>

<script>
  export default {
    name: 'error',
    props: ['error'],
    layout: 'plain'
  }
</script>

<style scoped>

</style>
