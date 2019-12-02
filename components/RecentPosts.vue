<template>
  <div class="app-footer__recent-posts">
    <div class="mb-7">
      <p class="headline white--text">Recent posts</p>
      <div class="app-border"></div>
    </div>

    <v-list two-line class="py-0">
      <template v-for="(item, index) in items">
        <v-list-item :key="item.title" @click="" class="px-0 mb-3" href="/">
          <v-list-item-avatar size="60" class="mr-3 mt-0">
            <v-img :src="item.avatar" class="mt-4"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-subtitle
              v-html="item.subtitle"
              class="pb-1 white--text"
            ></v-list-item-subtitle>

            <v-list-item-title
              v-html="item.title"
              class="font-weight-bold"
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
