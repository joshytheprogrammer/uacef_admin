<template>
  <b-carousel>
    <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
      <section :class="`hero is-medium is-${carousel.color}`">
        <div class="hero-body has-text-centered">
          <h1 class="title">{{carousel.text}}</h1>
        </div>
      </section>
    </b-carousel-item>
  </b-carousel>
</template>

<script>
export default {
  data(){
    return {
      carousels: [
        { text: 'Welcome back! 👋 Explore the UACEF Admin Portal once more.', color: 'primary' },
        { text: 'Craft and Modify Clips and Images with ease. 🖼️', color: 'info' },
        { text: 'Effortlessly view and toggle visibility of your media content. 👀', color: 'info' },
        { text: 'Navigate swiftly through the Quick Actions panel below. 🚀', color: 'info' },
        { text: 'Wishing you a delightful experience! 🌟', color: 'primary' }
      ]
    }
  }
}
</script>
