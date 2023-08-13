<template>
  <section>
    <Jumbotron />
    <Headers>
      <template #title>
        Quick Actions
      </template>
    </Headers>
    <Pages />
    <Footer />
  </section>
</template>

<script>
import Headers from '~/components/Headers.vue';
import Jumbotron from '~/components/Home/Jumbotron.vue'
import Pages from '~/components/Home/Pages.vue'
import Footer from '~/components/Footer.vue';

export default {
  components: {
    Jumbotron,
    Pages,
    Headers,
    Footer
},
  data() {
    return {

    }
  },
}
</script>
