<template>
  <section>
    <Headers>
      <template #title>
        Clips
      </template>
    </Headers>
    <div class="clip-list">
      <div v-for="clip in clips" :key="clip.id" class="card">
        <div class="card-content">
          <iframe :src="getEmbedUrl(clip.vidID)" frameborder="0" allowfullscreen></iframe>
          <button class="toggle-button" @click="toggleShowVideo(clip)">{{ clip.active ? 'Hide' : 'Show' }}</button>
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
      clips: [],
      isLoading: true, // Set initial loading state
    };
  },
  async created() {
    try {
      const querySnapshot = await this.$fire.firestore.collection("clip").get();

      this.clips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        vidID: doc.data().videoID,
        active: doc.data().active,
      }));
    } catch (error) {
      this.$buefy.snackbar.open({
        duration: 5000,
        message: `Error fetching clips - ${error}`,
        type: "is-danger",
      });
    } finally {
      this.isLoading = false; // Turn off loading state
    }
  },
  methods: {
    async toggleShowVideo(clip) {
      try {
        const clipRef = this.$fire.firestore.collection("clip").doc(clip.id);
        await clipRef.update({ active: !clip.active });
        clip.active = !clip.active;
      } catch (error) {
        this.$buefy.snackbar.open({
        duration: 5000,
        message: `Error toggling video - ${error}`,
        type: "is-danger",
      });
      }
    },
    getEmbedUrl(ID) {
      return `https://www.youtube.com/embed/${ID}`;
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

.clip-list {
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

iframe {
  width: 100%;
  height: 300px;
  border: none; /* Remove iframe border */
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
  .clip-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  iframe {
    height: 300px;
  }
}
</style>
