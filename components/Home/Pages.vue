<template>
  <div class="pages">
    <Card
      v-for="item in pages"
      :key="item.id"
      :link="item.link"
      :title="item.title"
      class="card"
    />
  </div>
</template>

<script>
import Card from '../Card.vue';
export default {
  components: {
    Card
  },
  data() {
    return {
      pages: [
        {
          id: 0,
          title: 'Create New Image',
          link: '/create/image'
        },
        {
          id: 1,
          title: 'Create New Clip',
          link: '/create/clip'
        },
        {
          id: 2,
          title: 'View all images',
          link: '/view/gallery'
        },
        {
          id: 3,
          title: 'View all clips',
          link: '/view/clips'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.pages {
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* Wrap cards onto a new line when screen is narrow */
}

.card {
  width: calc(50% - 1rem); /* Display two cards per row on mobile */
  margin: 0.5rem;
}

/* Media query for screens with max width 768px (typical tablet or mobile) */
@media (max-width: 768px) {
  .card {
    width: calc(100% - 1rem); /* Show one card per row on smaller screens */
  }
}
</style>
