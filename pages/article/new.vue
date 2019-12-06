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
            <!-- Category -->
            <v-select
              v-model="article.category_id"
              :items="categories"
              item-text="name"
              item-value="id"
              prepend-icon="mdi-folder"
              label="Danh mục"
              class="pb-2"
              :error-messages="msgSelectCategoryInvalid"
              @blur="$v.article.category_id.$touch()"
            >
              <template v-slot:append-outer>
                <v-btn color="secondary" @click="openDialog" x-small dense text>
                  <v-icon color="secondary">mdi-plus-circle</v-icon>
                </v-btn>
              </template>
            </v-select>

            <!-- Title -->
            <v-text-field
              v-model="article.title"
              label="Tiêu đề"
              prepend-icon="mdi-format-title"
              class="pb-2"
              :error-messages="msgTitleInvalid"
              @blur="$v.article.title.$touch()"
            ></v-text-field>

            <!-- Created At -->
            <v-menu
              v-model="toggleDatePicker"
              :close-on-content-click="false"
              max-width="290"
            >
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
              <v-date-picker
                v-model="article.created_at"
                @change="toggleDatePicker = false"
              ></v-date-picker>
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
            <v-text-field
              v-model="article.image"
              label="Url hình ảnh"
              prepend-icon="mdi-image"
              class="pb-2"
            ></v-text-field>

            <!-- Content -->
            <editor
              initialValue=""
              v-model="article.content"
              @blur="$v.article.content.$touch()"
              :error-messages="msgContentInvalid"
            ></editor>

            <div class="d-flex justify-end my-5">
              <v-btn class="mr-4">Cancel</v-btn>
              <v-btn color="secondary" @click="submitForm">
                <v-icon>mdi-plus</v-icon>
                Submit
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <p class="headline">Thêm danh mục</p>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="category"
                  label="Tên danh mục"
                  prepend-icon="mdi-folder"
                  :error-messages="msgCategoryInvalid"
                  :success-messages="msgCreateSuccessCategory"
                  @focus="resetCategory"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <!-- <small class="success--text">{{ msgCreateSuccessCategory }}</small> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Đóng</v-btn>
          <v-btn color="blue darken-1" text @click="createCategory"
            >Tạo danh mục</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import moment from 'moment'
import { required, minLength, numeric } from 'vuelidate/lib/validators'
import Editor from '@/components/Editor.vue'
import { resolve, reject } from 'q'

export default {
  components: {
    Editor
  },
  data() {
    return {
      dialog: false,
      msgCategoryInvalid: '',
      msgCreateSuccessCategory: '',
      toggleDatePicker: false,
      category: null,
      article: this.newArticleObject()
    }
  },
  validations: {
    category: { required },
    article: {
      title: {
        required,
        minLength: minLength(10)
      },
      category_id: { required },
      created_at: { required },
      reading_time: { required, numeric },
      content: {
        required,
        minLength: minLength(30)
      }
    }
  },
  async asyncData({ store }) {
    const resultCategories = await store.dispatch('category/getCategories')
    return { categories: resultCategories }
  },
  computed: {
    formatCreatedAt() {
      return this.article.created_at
        ? moment(this.article.created_at).format('MMM D, YYYY')
        : ''
    },
    msgSelectCategoryInvalid() {
      if (!this.$v.article.category_id.$error) return
      if (!this.$v.article.category_id.required) return 'Vui lòng chọn danh mục'
    },
    msgTitleInvalid() {
      if (!this.$v.article.title.$error) return
      if (!this.$v.article.title.required) return 'Vui lòng nhập tiêu đề'
      if (!this.$v.article.title.minLength)
        return 'Tiêu đề quá ngắn (tối thiểu 10 ký tự)'
    },
    msgReadingTimeInvalid() {
      if (!this.$v.article.reading_time.$error) return
      if (!this.$v.article.reading_time.required)
        return 'Vui lòng nhập thời gian đọc bài'
      if (!this.$v.article.reading_time.numeric)
        return 'Giá trị nhập vào phải là số nguyên'
    },
    msgContentInvalid() {
      if (!this.$v.article.content.$error) return
      if (!this.$v.article.content.required) return 'Vui lòng nhập nội dung'
      if (!this.$v.article.content.minLength)
        return 'Nội dung quá ngắn (tối thiểu 30 ký tự)'
    }
  },
  methods: {
    newArticleObject() {
      return {
        title: '',
        category_id: '',
        created_at: new Date().toISOString().substr(0, 10),
        reading_time: '',
        image: null,
        content: ''
      }
    },
    async submitForm() {
      this.$v.article.$touch()
      if (!this.$v.article.$invalid) {
        try {
          // Call Api create article
          let result = await this.$store.dispatch(
            'article/createArticle',
            this.article
          )

          // Redirect to detail page
          this.$router.push({
            name: 'article-id',
            params: { id: result.id }
          })

          // Clear form
          this.article = this.newArticleObject()
        } catch (e) {
          alert('Error: Please check console log')
          console.log(e)
        }
      }
    },
    // Category Dialog
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.resetCategory()
    },
    resetCategory() {
      this.msgCreateSuccessCategory = ''
      this.msgCategoryInvalid = ''
      this.category = ''
    },
    async createCategory() {
      this.$v.category.$touch()
      if (!this.$v.category.$invalid) {
        try {
          await this.$store.dispatch('category/createCategory', {
            name: this.category
          })
          this.msgCreateSuccessCategory = '* Tạo danh mục thành công'
          this.category = ''
        } catch (e) {
          alert('Error: Please check console log')
        }
      } else {
        this.msgCategoryInvalid = 'Vui lòng nhập danh mục'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
