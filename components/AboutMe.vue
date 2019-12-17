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
            <v-icon color="white" class="px-1">mdi-facebook-box</v-icon>
            <v-icon color="white" class="px-1">mdi-github-circle</v-icon>
            <v-icon color="white" class="px-1">mdi-gmail</v-icon>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <p>
      Sinh ra và lớn lên tại Đà Nẵng. Đi làm từ năm 2013 đến giờ vẫn chưa có gì ngoài 1 bà vợ và sắp thành cha đứa trẻ thứ 2. Nghĩ thấy
      loser vl ra. Blog viết bởi tui, ai thích thì đọc, ai không thích thì đọc 😝
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
