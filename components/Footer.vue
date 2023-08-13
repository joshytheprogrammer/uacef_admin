<template>
  <footer class="footer">
    <p>
      This website was designed and built by
      <a href="https://joshytheprogrammer.com" class="link">joshytheprogrammer</a>
      on behalf of
      <a href="https://mayworkslimited.com" class="link">mayworksintegrated</a>
    </p>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.footer {
  width: 100%;
  background-color: #f4f4f4;
  padding: 1rem;
  text-align: center;
}

.link {
  color: $primary;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link:hover {
  color: #0056b3;
}
</style>
