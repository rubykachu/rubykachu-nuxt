<template>
  <div class="app-footer__about-me">
    <div class="mb-5">
      <p class="headline white--text">Tác giả</p>
      <div class="app-border"></div>
    </div>
    <v-list three-line>
      <v-list-item @click="" class="px-0">
        <v-list-item-avatar size="90" class="mr-3 mt-0" color="grey darken-3">
          <v-img src="/avatar.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="font-weight-bold hover-link"><a class="white--text">Minh Tang Q.</a></v-list-item-title>

          <v-list-item-subtitle class="py-2">Founder & Editor</v-list-item-subtitle>

          <div class="app-footer__about-me__associate">
            <associate />
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <p>{{ introduceAuthor }}</p>
  </div>
</template>

<script>
import Associate from '@/components/Associate.vue'
import { introduceMysefl } from '@/mixins/helper.js'
export default {
  components: {
    Associate
  },
  computed: {
    introduceAuthor() {
      return introduceMysefl()
    }
  }
}
</script>

<style lang="scss" scoped></style>
