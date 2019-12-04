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
            <v-select
              :items="['Foo', 'Bar', 'Fizz', 'Buzz']"
              prepend-icon="mdi-equal-box"
              label="Danh mục"
            ></v-select>

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

            <v-file-input
              show-size
              label="Ảnh bài viêt"
              prepend-icon="mdi-image"
            ></v-file-input>

            <editor
              api-key="no-api-key"
              initialValue="<p>This is the initial content of the editor</p>"
              :init="{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                  'codesample'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help | codesample'
              }"
            ></editor>

            <div class="d-flex justify-end my-5">
              <v-btn class="mr-4">Cancel</v-btn>
              <v-btn color="secondary">
                <v-icon>mdi-plus</v-icon>
                Submit
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreatedField from '@/components/article/CreatedField.vue'
import CloudTagField from '@/components/article/CloudTagField.vue'
import Editor from '@tinymce/tinymce-vue'

export default {
  components: {
    CreatedField,
    CloudTagField,
    Editor
  }
}
</script>

<style lang="scss" scoped></style>
