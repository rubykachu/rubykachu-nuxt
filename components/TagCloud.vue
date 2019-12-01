<template>
  <div>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="white--text headline"
            >Cloud Tags</v-list-item-title
          >
          <div class="app-border"></div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-chip
      class="ma-2 white--text font-weight-bold"
      :color="tag.color"
      v-for="tag in tags"
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
