<template>
  <v-container class="panel">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="10">
        <v-card class="rounded-15">
          <v-toolbar flat color="white">
            <v-icon>mdi-lead-pencil</v-icon>
            <v-toolbar-title class="font-weight-light ml-2">
              <slot name="toolbar-title">Viết bài</slot>
            </v-toolbar-title>
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
              :loading="$v.article.title.$pending"
            ></v-text-field>

            <!-- Slug -->
            <v-text-field v-model="article.slug" label="Đường dẫn bài viết" prepend-icon="mdi-link" class="pb-2"></v-text-field>

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
              v-model="article.content"
              :initialValue="article.content"
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

              <v-btn color="secondary" @click="submitCreateArticle" :disabled="disabledSubmit" v-if="actionType == 'create'">
                <v-icon>mdi-plus</v-icon> Tạo bài viết
              </v-btn>

              <v-btn color="secondary" @click="submitUpdateArticle" :disabled="disabledSubmit" v-if="actionType == 'update'">
                <v-icon class="mr-1">mdi-update</v-icon> Cập nhập
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
import { formatDate, sanitizeTitle } from '@/mixins/helper.js'
import Editor from '@/components/Editor.vue'
import DialogCreateCategory from '@/components/article/DialogCreateCategory.vue'
import DialogColorPicker from '@/components/article/DialogColorPicker.vue'
import ValidateForm from '@/mixins/article/ValidateForm.js'

export default {
  mixins: [ValidateForm],
  components: {
    Editor,
    DialogCreateCategory,
    DialogColorPicker
  },
  props: {
    actionType: {
      required: true,
      type: String
    },
    dataArticle: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      dialogLeavePage: false,
      dialogCategory: false,
      toggleDatePicker: false,
      toggleDialogColorPicker: false,
      disabledSubmit: false,
      formSubmitted: false,
      article: this.dataArticle,
      categories: []
    }
  },
  async beforeCreate() {
    try {
      let data = await this.$store.dispatch('category/getCategories')
      this.categories = data
    } catch (e) {
      console.log(e)
      store.dispatch('toast/show')
    }
  },
  watch: {
    'article.title': function(val) {
      this.article.slug = sanitizeTitle(val)
    }
  },
  computed: {
    color() {
      return this.article.category && this.article.category.color
    },
    formatCreatedAt() {
      return formatDate(this.article.created_at)
    }
  },
  methods: {
    async submitCreateArticle() {
      this.$v.article.$touch()
      if (!this.$v.article.$invalid) {
        try {
          this.disabledSubmit = true
          // Call Api create article
          let result = await this.$store.dispatch('article/createArticle', this.article)

          // Redirect to detail page
          this.$router.push({
            name: 'article-id',
            params: { id: result.slug }
          })
        } catch (e) {
          this.disabledSubmit = false
          console.log(e)
          store.dispatch('toast/show')
        }
      }
    },
    async submitUpdateArticle() {
      this.$v.article.$touch()
      if (!this.$v.article.$invalid) {
        try {
          this.disabledSubmit = true
          // Call Api create article
          let result = await this.$store.dispatch('article/updateArticle', this.article)

          // Redirect to detail page
          this.$router.push({
            name: 'article-id',
            params: { id: result.slug }
          })
          this.$store.dispatch('toast/show', 'Cập nhập thành công')
        } catch (e) {
          this.disabledSubmit = false
          console.log(e)
          this.$store.dispatch('toast/show')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
