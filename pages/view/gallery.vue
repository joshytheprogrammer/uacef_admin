<template>
  <section>
    <Headers>
      <template #title>
        Gallery
      </template>
    </Headers>
    <div class="image-gallery">
      <div v-if="!isLoading && images.length > 0" class="card-grid">
        <figure class="image-card" v-for="item in images" :key="item.id">
          <img class="rounded-xl w-full" :src="item.imgLink" :alt="'img - ' + item.id" />
          <button class="toggle-button" @click="toggleShowImage(item)">{{ item.active ? 'Hide' : 'Show' }}</button>
        </figure>
      </div>
      <div v-else class="loading-placeholder">
        <b-loading v-model="isLoading" :can-cancel="false"></b-loading>
      </div>
    </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  width: 100%;
  margin-top: 2rem;
}

.image-card {
  width: 100%;
  height: fit-content;
  // padding: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-right: 6px;
  margin-bottom: 6px;
  border: 2px solid #ccc;
  // border-radius: 12px;
  display: inline-block;
  transition: border-color 0.3s ease-in-out;
  // cursor: pointer;

  &:hover {
    border-color: #800080;
  }

  img {
    width: 100%;
    height: auto;
    border: none;
    // border-radius: 12px;
  }
}


.loading-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* You can adjust the height */
}

.toggle-button {
  background-color: $primary;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  margin: 1rem;
  padding: 0.5rem 1rem;
  font-weight: normal;
  cursor: pointer;
}

/* Mobile responsive adjustments */
@media screen and (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
