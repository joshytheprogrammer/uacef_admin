<template>
  <section>
    <h1 class="subtitle is-size-3">Create new clip</h1>
    <form @submit.prevent="submit" class="form">
      <b-field label="Video Link">
        <b-input v-model="clip.url" placeholder="Enter the video URL" :disabled="loading" required></b-input>
      </b-field>
      <b-field label="Active">
        <b-radio v-model="clip.active"
          name="active"
          native-value="true">
          True
        </b-radio>
        <b-radio v-model="clip.active"
          name="active"
          native-value="false">
          False
        </b-radio>
      </b-field>
      <b-button native-type="submit" type="is-primary" :loading="loading">Submit</b-button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      clip: {
        url: '',
        active: true
      },
      file: {},
      loading: false,
    }
  },
  methods: {
    async submit() {
      this.loading = true;

      // Extract YouTube video ID from the URL
      const videoId = this.extractVideoId(this.clip.url);

      if (!videoId) {
        this.$buefy.snackbar.open({
          duration: 5000,
          message: "Invalid YouTube URL. Please enter a valid YouTube video URL.",
          type: "is-danger",
        });

        this.loading = false;
        return;
      }

      await this.$fire.firestore
        .collection("clip")
        .add({
          videoID: videoId,
          active: this.clip.active,
        })
        .then((docRef) => {
          this.$buefy.snackbar.open({
            duration: 10000,
            message: `Clip created with ID - ${docRef.id} `,
            type: "is-success",
          });

          this.$router.push("/view/clips");
        })
        .catch((error) => {
          this.$buefy.snackbar.open({
            duration: 5000,
            message: `Something went wrong - ${error}`,
            type: "is-danger",
          });

          this.loading = false;
        });
    },

    extractVideoId(url) {
      // Regular expression to match various YouTube URL formats
      const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|watch\/.+&v=)|youtu\.be\/)([^&\n?]+)/;
      const match = url.match(regex);

      if (match && match[1]) {
        return match[1];
      }

      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  padding: 1rem;
  margin: 2rem auto;

  width: 400px;

  display: block;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);

  @media screen and (max-width: $medium) {
    max-width: 90%;
  }
}
</style>
