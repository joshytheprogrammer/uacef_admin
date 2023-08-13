<template>
  <div class="card">
    <h2>
      {{ title }}
    </h2>
    <NuxtLink :to="link" class="btn"> Execute </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    link: String, // Dynamic link for the button
    title: String, // Dynamic text for the button
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: fit-content;
  padding: 3rem 2rem;
  margin: 2rem;

  h2 {
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    padding-bottom: 2rem;
  }
  .btn {
    display: inline-block;
    width: 100%;
    text-align: center;
    padding: 0.5rem 1rem;
    background-color: $primary;
    color: #ffffff;
    text-decoration: none;
    border-radius: 4px;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }
}
</style>
