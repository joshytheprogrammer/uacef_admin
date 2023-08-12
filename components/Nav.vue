<template>
  <b-navbar fixed-top>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="@/static/uacef_logo.jpg" alt="UACEF logo">
        <span class="title has-text-primary">UACEF Portal</span>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item href="/">
        Home
      </b-navbar-item>
      <b-navbar-dropdown label="Create">
        <b-navbar-item href="/create/banner">
          Images
        </b-navbar-item>
        <b-navbar-item href="/create/product">
          Clips
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item href="/#" @click.prevent="logout">
        Logout
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    async logout() {

      await this.$fire.auth.signOut()
      .then(() => {
        this.$buefy.toast.open({
          duration: 10000,
          message: 'Logout successful',
          type: 'is-success'
        })
        this.$router.push('/login')
      })
      .catch((error) => {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something went wrong - ${error.message}`,
          type: 'is-danger'
        })

        this.loading = false
      });
    }
  }
}
</script>
