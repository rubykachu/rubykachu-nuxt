<template>
   <v-row class="section section--transparent author-info rounded-15" justify="center">
      <div class="section__content--w75">
        <div class="section__avatar">
          <v-avatar size="80">
            <img
              src="/avatar.jpg"
              alt="Minh Tang Q."
            ></img>
          </v-avatar>
        </div>
        <p class="section__title hover-link"><a class="white--text">Minh Tang Q.</a></p>
        <p class="section__content">{{ introduceAuthor }} </p>
      </div>
    </v-row>
</template>

<script>
import { introduceMysefl } from '@/mixins/helper'
export default {
    computed: {
      introduceAuthor() {
      return introduceMysefl()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
