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
              prepend-icon="mdi-equal-box"
              label="Danh mục"
              class="pb-2"
              :error-messages="msgCategoryInvalid"
              @blur="$v.article.category_id.$touch()"
            ></v-select>

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
              value="8 phút"
              prepend-icon="mdi-circle-slice-5"
              class="pb-2"
              :error-messages="msgReadingTimeInvalid"
              @blur="$v.article.reading_time.$touch()"
            ></v-text-field>

            <!-- Cloud tags -->
            <v-combobox
              v-model="article.tags"
              :items="tags"
              item-text="name"
              item-value="id"
              :search-input.sync="searchTag"
              hide-selected
              hint="Tối đa 5 tags"
              label="Cloud tags"
              prepend-icon="mdi-tag-multiple"
              class="pb-2"
              multiple
              persistent-hint
              small-chips
              :error-messages="msgTagsInvalid"
              @change="$v.article.tags.$touch()"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      No results matching "<strong>{{ searchTag }}</strong
                      >". Press <kbd>enter</kbd> to create a new one
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-combobox>

            <!-- Image -->
            <v-file-input
              v-model="article.image"
              show-size
              label="Ảnh bài viêt"
              prepend-icon="mdi-image"
              accept="image/*"
              class="pb-2"
            ></v-file-input>

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
  </v-container>
</template>

<script>
import moment from 'moment'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import Editor from '@/components/Editor.vue'

export default {
  components: {
    Editor
  },
  data() {
    return {
      toggleDatePicker: false,
      searchTag: null,
      tags: [
        { id: 1, name: 'technical' },
        { id: 2, name: 'html' },
        { id: 3, name: 'vue' }
      ],
      categories: [
        { id: 1, name: 'Ruby' },
        { id: 2, name: 'Category' },
        { id: 3, name: 'JS' }
      ],
      article: this.newArticleObject()
    }
  },
  validations: {
    article: {
      title: {
        required,
        minLength: minLength(10)
      },
      category_id: { required },
      created_at: { required },
      reading_time: { required },
      tags: { maxLength: maxLength(5) },
      content: {
        required,
        minLength: minLength(30)
      }
    }
  },
  watch: {
    'article.tags': function(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.article.tags.pop())
      }
    }
  },
  computed: {
    formatCreatedAt() {
      return this.article.created_at
        ? moment(this.article.created_at).format('dddd, MMMM Do YYYY')
        : ''
    },
    msgCategoryInvalid() {
      if (!this.$v.article.category_id.$error) return
      if (!this.$v.article.category_id.required) return 'Vui lòng chọn danh mục'
    },
    msgTitleInvalid() {
      if (!this.$v.article.title.$error) return
      if (!this.$v.article.title.required) return 'Vui lòng nhập tiêu đề'
      if (!this.$v.article.title.minLength)
        return 'Tiêu đề quá ngắn (tối thiểu 10 ký tự)'
    },
    msgTagsInvalid() {
      if (!this.$v.article.tags.$error) return
      if (!this.$v.article.tags.maxLength) return 'Chỉ có thể nhập tối đa 5 tag'
    },
    msgReadingTimeInvalid() {
      if (!this.$v.article.reading_time.$error) return
      if (!this.$v.article.reading_time.required)
        return 'Vui lòng nhập thời gian đọc bài'
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
        tags: [],
        image: null,
        content: ''
      }
    },
    async submitForm() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          let result = await this.$store.dispatch(
            'article/createArticle',
            this.article
          )
          debugger
          this.$router.push({
            name: 'article-id',
            params: { id: result.id }
          })
          this.article = this.newArticleObject()
        } catch (e) {
          alert('Error: Please check console log')
          console.log(e)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
