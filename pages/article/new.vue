<template>
  <v-container class="panel">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="10">
        <v-card class="rounded-15">
          <v-toolbar flat color="white">
            <v-icon>mdi-lead-pencil</v-icon>
            <v-toolbar-title class="font-weight-light ml-2">Viết bài</v-toolbar-title>
          </v-toolbar>

          <v-divider></v-divider>

          <v-card-text>
            <!-- Category -->
            <v-combobox
              v-model="article.category"
              :items="categories"
              item-value="id"
              item-text="name"
              autocomplete
              label="Danh mục"
              prepend-icon="mdi-folder"
              class="pb-2"
              :error-messages="msgSelectCategoryInvalid"
              @blur="$v.article.category.$touch()"
            >
              <template v-slot:append-outer>
                <!-- button add color -->
                <v-icon :color="color">mdi-circle</v-icon>

                <!-- button add category -->
                <v-btn @click="dialogCategory = true" x-small dense text>
                  <v-icon color="secondary">mdi-plus-circle</v-icon>
                </v-btn>
              </template>
            </v-combobox>

            <!-- Title -->
            <v-text-field
              v-model="article.title"
              label="Tiêu đề"
              prepend-icon="mdi-format-title"
              class="pb-2"
              :error-messages="msgTitleInvalid"
              @blur="$v.article.title.$touch()"
              counter="80"
              hint="2 dòng (80 ký tự). 3 dòng (108 ký tự)"
            ></v-text-field>

            <!-- Created At -->
            <v-menu v-model="toggleDatePicker" :close-on-content-click="false" max-width="290">
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="formatCreatedAt"
                  clearable
                  label="Ngày tạo"
                  readonly
                  v-on="on"
                  @click:clear="article.created_at = null"
                  prepend-icon="mdi-calendar"
                  class="pb-2"
                ></v-text-field>
              </template>
              <v-date-picker v-model="article.created_at" @change="toggleDatePicker = false"></v-date-picker>
            </v-menu>

            <!-- Reading time -->
            <v-text-field
              v-model="article.reading_time"
              label="Thời gian đọc"
              value="15"
              hint="Thời gian tính bằng phút"
              type="number"
              prepend-icon="mdi-circle-slice-5"
              class="pb-2"
              :error-messages="msgReadingTimeInvalid"
              @blur="$v.article.reading_time.$touch()"
            ></v-text-field>

            <!-- Image -->
            <v-text-field v-model="article.image" label="Url ảnh lớn" prepend-icon="mdi-image" class="pb-2"></v-text-field>

            <v-text-field
              v-model="article.image_thumb"
              label="Url ảnh nhỏ"
              prepend-icon="mdi-image-size-select-large"
              class="pb-2"
            ></v-text-field>

            <!-- Description -->
            <v-textarea
              v-model="article.description"
              label="Mô tả ngắn"
              auto-grow
              prepend-icon="mdi-card-text"
              rows="1"
              row-height="15"
              hint="Mô tả sẽ không có trong nội dung của bài viết. 2 dòng (100 ký tự)"
              class="mb-7"
              counter="145"
              :error-messages="msgDescriptionInvalid"
              @blur="$v.article.description.$touch()"
            ></v-textarea>

            <!-- Content -->
            <editor
              initialValue=""
              v-model="article.content"
              @blur="$v.article.content.$touch()"
              :error-messages="msgContentInvalid"
            ></editor>

            <div class="d-flex justify-end my-5">
              <template v-if="$v.$anyError">
                <p class="error--text">
                  <v-icon color="error">mdi-alert</v-icon>
                  Nội dung không hợp lệ. Vui lòng kiểm tra lại.
                </p>
                <v-spacer></v-spacer>
              </template>
              <v-btn class="mr-4" to="/" nuxt>Huỷ bỏ</v-btn>
              <v-btn color="secondary" @click="submitForm" :disabled="disabledSubmit">
                <v-icon>mdi-plus</v-icon>
                Tạo bài viết
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <dialog-create-category :dialog="dialogCategory" @click:close="dialogCategory = false" />
    <dialog-color-picker
      :dialog="toggleDialogColorPicker"
      @click:close="toggleDialogColorPicker = false"
      v-model="article.color"
    ></dialog-color-picker>
  </v-container>
</template>

<script>
import Editor from '@/components/Editor.vue'
import DialogCreateCategory from '@/components/article/DialogCreateCategory.vue'
import DialogColorPicker from '@/components/article/DialogColorPicker.vue'
import formArticle from '@/mixins/article/form.js'

export default {
  mixins: [formArticle],
  components: {
    Editor,
    DialogCreateCategory,
    DialogColorPicker
  },
  head: () => ({
    title: 'Create a new article'
  }),
  data() {
    return {
      dialogCategory: false,
      toggleDatePicker: false,
      toggleDialogColorPicker: false,
      disabledSubmit: false,
      article: this.newArticleObject()
    }
  },
  computed: {
    color() {
      return this.article.category && this.article.category.color
    }
  },
  methods: {
    newArticleObject() {
      return {
        title: '',
        category: '',
        created_at: new Date().toISOString().substr(0, 10),
        reading_time: '',
        image: '',
        image_thumb: '',
        description: '',
        content: ''
      }
    },
    async submitForm() {
      this.$v.article.$touch()
      if (!this.$v.article.$invalid) {
        try {
          this.disabledSubmit = true
          // Call Api create article
          let result = await this.$store.dispatch('article/createArticle', this.article)

          // Redirect to detail page
          this.$router.push({
            name: 'article-id',
            params: { id: result.id }
          })
        } catch (e) {
          this.disabledSubmit = false
          console.log(e)
          store.dispatch('toast/show')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
