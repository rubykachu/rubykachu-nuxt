<template>
  <div class="sidebar__categories">
    <v-list>
      <v-list-item-title class="sidebar__title">
        <h4>Categories</h4>
      </v-list-item-title>
      <v-list-item v-for="cate in categories" :key="index" v-text="cate.name" :to="`/categories/${cate.slug}`" nuxt></v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data: () => ({
    categories: []
  }),
  async beforeCreate() {
    try {
      this.categories = await this.$store.dispatch('category/getCategories')
    } catch (e) {
      console.log(e)
      store.dispatch('toast/show')
    }
  }
}
</script>

<style lang="scss" scoped></style>
