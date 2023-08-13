<template>
  <div class="header">
    <h2>
      <slot name="title" />
    </h2>
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  margin-top: 1rem;
  padding: 40px 1rem;
  background: $primary;
  color: $light;
  text-align: center;

  h2 {
    font-size: 36px;
    font-weight: 400;
  }

  @media screen and (max-width: $medium) {
    padding: 20px 16px;

    h2 {
      font-size: 28px;
    }
  }

  @media screen and (max-width: $small) {
    h2 {
      font-size: 24px;
    }
  }
}
</style>
