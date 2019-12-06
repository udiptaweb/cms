<template>
  <div class="container has-text-centered">
    <h1 class="has-text-centered title">ERROR : {{error.statusCode}}</h1>
    <h2 class="has-text-weight-semibold">Please check your Network Connectivity</h2>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'errorLayout' 
}
</script>