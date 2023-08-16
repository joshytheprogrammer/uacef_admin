<template>
  <section>
    <h1 class="subtitle is-size-3">Create new image</h1>
    <form @submit.prevent="submit" class="form">
      <b-field label="Mode">
        <b-select
          placeholder="Select Create Mode"
          v-model="mode"
          expanded>
          <option value="link">Link to the Image</option>
          <option value="file">Upload the Image</option>
        </b-select>
      </b-field>
      <b-field label="Image Link" v-if="mode === 'link'">
        <b-input v-model="image.link" placeholder="Enter the image link" :disabled="loading" required></b-input>
      </b-field>
      <b-field label="Image" v-if="mode === 'file'">
        <b-field class="file is-primary" :class="{'has-name': !!file}">
          <b-upload v-model="file" accept=".jpg, .JPG, .png, .PNG, .jpeg, .JPEG" class="file-label" validation-message="Only jpg, jpeg and png are allowed" :disabled="loading" required name="file">
            <span class="file-cta">
              <b-icon class="file-icon" icon="upload"></b-icon>
              <span class="file-label">Click to upload</span>
            </span>
            <span class="file-name" v-if="file">
              {{ file.name }}
            </span>
          </b-upload>
        </b-field>
      </b-field>
      <b-field label="Active">
        <b-radio v-model="image.active" native-value="true">True</b-radio>
        <b-radio v-model="image.active" native-value="false">False</b-radio>
      </b-field>
      <b-button native-type="submit" type="is-primary" :loading="loading">Submit</b-button>
    </form>
    <p>Want to confirm your uploads? <NuxtLink to="/view/gallery">View Gallery</NuxtLink></p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      image: {
        active: true,
        link: '',
      },
      mode: 'link',
      file: {},
      loading: false,
    };
  },
  methods: {
    async submit() {
      this.loading = true;

      try {
        if (this.mode === 'file') {
          const cloudinaryLink = await this.uploadToCloudinary();
          this.image.link = cloudinaryLink;
        }

        await this.$fire.firestore
          .collection('gallery')
          .add({
            imgLink: this.image.link,
            active: this.image.active,
          });

        this.$buefy.snackbar.open({
          duration: 10000,
          message: 'Image uploaded and created successfully',
          type: 'is-success',
        });

        this.mode === 'link' ? (this.image.link = '') : (this.file = {});
      } catch (error) {
        this.$buefy.snackbar.open({
          duration: 5000,
          message: `Something went wrong - ${error.message}`,
          type: 'is-danger',
        });
      } finally {
        this.loading = false;
      }
    },

    async uploadToCloudinary() {
      try {
        if (this.file.size >= 512000) {
          throw new Error('File should be less than 500kb');
        }

        const formData = new FormData();
        formData.append('file', this.file);
        formData.append('upload_preset', 'sitmp7vs');
        formData.append('folder', 'uacef');

        const response = await fetch('https://api.cloudinary.com/v1_1/dsgvwxygr/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error.message);
        }

        return data.secure_url;
      } catch (error) {
        throw error;
      }
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

  p {
    margin: 1rem;
    text-align: center;
  }

  @media screen and (max-width: $medium) {
    max-width: 90%;
  }
}
</style>
