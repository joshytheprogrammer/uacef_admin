<template>
  <div class="app">
    <Nav />
    <Nuxt />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>
