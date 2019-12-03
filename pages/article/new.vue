<template>
  <v-container class="panel">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="10">
        <v-card ref="form" class="rounded-15">
          <v-toolbar flat color="white">
            <v-icon>mdi-lead-pencil</v-icon>
            <v-toolbar-title class="font-weight-light ml-2"
              >Viết bài</v-toolbar-title
            >
          </v-toolbar>

          <v-divider></v-divider>

          <v-card-text>
            <categories-field></categories-field>

            <v-text-field
              ref="name"
              label="Tiêu đề"
              prepend-icon="mdi-format-title"
              class="mt-0 pt-0"
            ></v-text-field>

            <created-field></created-field>

            <v-text-field
              ref="time"
              label="Thời gian đọc"
              value="8 phút"
              prepend-icon="mdi-circle-slice-5"
            ></v-text-field>

            <cloud-tag-field></cloud-tag-field>

            <v-text-field ref="name" label="Nội dung"></v-text-field>

            <v-file-input
              show-size
              label="Ảnh bài viêt"
              prepend-icon="mdi-image"
            ></v-file-input>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreatedField from '@/components/article/CreatedField.vue'
import CloudTagField from '@/components/article/CloudTagField.vue'
import CategoriesField from '@/components/article/CategoriesField.vue'

export default {
  components: {
    CreatedField,
    CloudTagField,
    CategoriesField
  }
}
</script>

<style lang="scss" scoped></style>
