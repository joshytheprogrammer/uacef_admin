<template>
  <section>
    <!-- :paginated="isPaginated" -->
    <b-table
      :loading="loading"
      :data="data"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :pagination-rounded="isPaginationRounded"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      default-sort="name"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      sticky-header
      height = "380px"
      :page-input="hasInput"
      :pagination-order="paginationOrder"
      :page-input-position="inputPosition"
      :debounce-page-input="inputDebounce">

      <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <b-table-column field="name" label="Name" width="450" searchable sortable v-slot="props">
        {{ props.row.name }}
      </b-table-column>

      <b-table-column field="image" label="Image" width="150" v-slot="props">
        <img :src="props.row.image" :alt="props.row.name + ' image'">
      </b-table-column>

      <b-table-column field="price" label="Price" sortable centered v-slot="props">
        {{ props.row.price }}
      </b-table-column>

      <b-table-column field="live" label="Live" sortable v-slot="props">
        {{ props.row.active }}
      </b-table-column>

      <b-table-column field="actions" label="Actions" centered v-slot="props">
        <div class="actions">
          <span><a target="_blank" :href="'https://tecpastryworld.com/shop/'+props.row.slug">View</a></span>
          <span><NuxtLink :to="'/edit/product/'+props.row.id">Edit</NuxtLink></span>
          <span>
            <a title="Hide product" v-if="props.row.active" @click.prevent="toggleActive(props.row.id, props.row.active)">Hide</a>
            <a title="Show Product" v-else @click.prevent="toggleActive(props.row.id, props.row.active)">Show</a>
          </span>
          <span>
            <a title="Hide product" v-if="props.row.starred" @click.prevent="toggleStar(props.row.id, props.row.starred)">Unstar</a>
            <a title="Show Product" v-else @click.prevent="toggleStar(props.row.id, props.row.starred)">Star</a>
          </span>
        </div>
      </b-table-column>

    </b-table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      loading: false,
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 5,
      hasInput: false,
      paginationOrder: '',
      inputPosition: '',
      inputDebounce: ''
    }
  },
  async fetch() {
    try {
      this.loading = true
      await this.$fire.firestore.collection('products').orderBy('name').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.data.push({id: doc.id, image: doc.data().thumbnail, name: doc.data().name, price: doc.data().price, slug: doc.data().slug, active: doc.data().active, starred: doc.data().recommended})
        })
        this.loading = false
      })
    } catch (error) {
      this.loading = false
      this.$buefy.toast.open({
        duration: 5000,
        message: `Something went wrong - ${error}`,
        type: 'is-danger'
      })
    }
  },
  methods: {
    async toggleActive(id, active) {
      active = !active
      this.loading = true

      await this.$fire.firestore.collection('products').doc(id).set({
        active: active
      }, { merge: true })
      .then(() => {
        this.$buefy.toast.open({
          duration: 10000,
          message: 'Operation successful',
          type: 'is-success'
        })
        this.data = []
        this.loading = false
        this.$fetch()
      })
      .catch((error) => {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something went wrong - ${error}`,
          type: 'is-danger'
        })

        this.loading = false
      })

    },
    async toggleStar(id, starred) {
      starred = !starred
      this.loading = true

      await this.$fire.firestore.collection('products').doc(id).set({
        recommended: starred
      }, { merge: true })
      .then(() => {
        this.$buefy.toast.open({
          duration: 10000,
          message: 'Operation successful',
          type: 'is-success'
        })
        this.data = []
        this.loading = false
        this.$fetch()
      })
      .catch((error) => {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something went wrong - ${error}`,
          type: 'is-danger'
        })

        this.loading = false
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  tr td img {
    object-fit: contain;
    width: 100%;
    max-width: 100px;
    max-height: 100px
  }
}
</style>
