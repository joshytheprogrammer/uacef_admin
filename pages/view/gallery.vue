<template>
  <section>
    <Headers>
      <template #title>
        Gallery
      </template>
    </Headers>
    <div class="image-gallery">
      <div v-for="image in images" :key="image.id" class="card">
        <div class="card-content">
          <img :src="image.imgLink" alt="Gallery Image" />
          <button class="toggle-button" @click="toggleShowImage(image)">{{ image.active ? 'Hide' : 'Show' }}</button>
        </div>
      </div>
    </div>
    <b-loading v-model="isLoading" :can-cancel="false"></b-loading>
  </section>
</template>

<script>
import Headers from '~/components/Headers.vue';

export default {
  components: {
    Headers,
  },
  data() {
    return {
      images: [],
      isLoading: true,
    };
  },
  async created() {
    try {
      const querySnapshot = await this.$fire.firestore.collection("gallery").get();

      this.images = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        imgLink: doc.data().imgLink,
        active: doc.data().active,
      }));
    } catch (error) {
      this.$buefy.snackbar.open({
        duration: 5000,
        message: `Error fetching gallery images - ${error}`,
        type: "is-danger",
      });
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    async toggleShowImage(image) {
      try {
        const imageRef = this.$fire.firestore.collection("gallery").doc(image.id);
        await imageRef.update({ active: !image.active });
        image.active = !image.active;
      } catch (error) {
        this.$buefy.snackbar.open({
          duration: 5000,
          message: `Error toggling image - ${error}`,
          type: "is-danger",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  padding: 2rem 1rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  width: 100%;
  margin-top: 2rem;
}

.card-content {
  position: relative;
  padding: 0;
}


img {
  width: 100%;
  height: auto;
  border: none;
}

.toggle-button {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: $primary;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: normal;
  cursor: pointer;
}

/* Mobile responsive adjustments */
@media screen and (max-width: 768px) {
  .image-gallery {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
