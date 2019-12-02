<template>
  <div>
    <div class="mb-8">
      <p class="headline white--text">Cloud tags</p>
      <div class="app-border"></div>
    </div>
    <v-chip
      class="ma-2 white--text font-weight-bold"
      :color="tag.color"
      v-for="(tag, index) in tags"
      :key="index"
      transition="slide-y-transition"
    >
      {{ tag.text }}
    </v-chip>
  </div>
</template>

<script>
export default {
  data: () => ({
    tags: [
      { color: 'primary', text: 'Astronomy' },
      { color: 'pink', text: 'Galaxy' },
      { color: 'green', text: 'Science' },
      { color: 'pink lighten-2', text: 'Solar System' },
      { color: 'teal', text: 'Space Travel' }
    ]
  })
}
</script>

<style lang="scss" scoped></style>
