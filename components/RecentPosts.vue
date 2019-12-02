<template>
  <div class="app-footer__recent-posts">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="white--text headline"
            >Recent Posts</v-list-item-title
          >
          <div class="app-border"></div>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list two-line class="py-0">
      <template v-for="(item, index) in items">
        <v-list-item :key="item.title" @click="">
          <v-list-item-avatar size="60" class="mr-3 mt-0">
            <v-img :src="item.avatar" class="mt-4"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-subtitle
              v-html="item.subtitle"
              class="white--text pb-3"
            ></v-list-item-subtitle>

            <v-list-item-title
              v-html="item.title"
              class="white--text font-weight-bold"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Mars is the fourth planet from the Sun. ',
        subtitle: 'June 5, 2019'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Mars is the fourth planet from the Sun',
        subtitle: 'June 5, 2019'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Mars is the fourth planet from the Sun',
        subtitle: 'June 5, 2019'
      }
    ]
  })
}
</script>

<style lang="scss" scoped></style>
