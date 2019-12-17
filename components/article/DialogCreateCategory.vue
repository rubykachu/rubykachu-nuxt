<template>
  <v-dialog v-model="toggleDialog" persistent max-width="600px">
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
                :loading="$v.category.$pending"
                @blur="$v.category.$touch()"
                @focus="resetForm"
              ></v-text-field>

              <v-text-field v-model="slug" label="Đường dẫn danh mục" prepend-icon="mdi-link"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-color-picker
                v-model="color"
                light
                flat
                hide-canvas
                show-swatches
                hide-mode-switch
                mode="hexa"
                width="600px"
              ></v-color-picker>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <small class="success--text">{{ msgCreateSuccessCategory }}</small>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Đóng</v-btn>
        <v-btn color="blue darken-1" text @click="createCategory" :disabled="disabled">Tạo danh mục</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { sanitizeTitle } from '@/mixins/helper.js'
import { required } from 'vuelidate/lib/validators'

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      color: '#EC407A',
      disabled: false,
      toggleDialog: this.dialog,
      msgCreateSuccessCategory: '',
      category: null,
      slug: ''
    }
  },
  watch: {
    dialog(value) {
      this.toggleDialog = value
    },
    category: function(val) {
      this.slug = sanitizeTitle(val)
    }
  },
  validations: {
    category: {
      required,
      async isUnique(value) {
        if (value == '') return
        if (!this.$v.category.required) return
        let isUniq = await new Promise(resolve => {
          setTimeout(async () => {
            try {
              await this.$store.dispatch('category/findSlug', this.slug)
              resolve(false)
            } catch (e) {
              resolve(true)
            }
          }, 850)
        })
        return Boolean(isUniq)
      }
    }
  },
  computed: {
    msgCategoryInvalid() {
      if (!this.$v.category.$error) return
      if (!this.$v.category.required) return 'Vui lòng nhập tên danh mục'
      if (!this.$v.category.isUnique) return 'Tên danh mục đã tồn tại'
    }
  },
  methods: {
    closeDialog() {
      this.toggleDialog = false
      this.resetForm()
      this.$emit('click:close')
    },
    resetForm() {
      this.msgCreateSuccessCategory = ''
      this.category = ''
      this.slug = ''
    },
    async createCategory() {
      this.$v.category.$touch()
      if (!this.$v.category.$invalid) {
        this.disabled = true
        try {
          await this.$store.dispatch('category/createCategory', {
            name: this.category,
            color: this.color,
            slug: this.slug
          })
          this.disabled = false
          this.resetForm()
          this.msgCreateSuccessCategory = '* Tạo danh mục thành công'
          this.$nextTick(() => {
            this.$v.$reset()
          })
        } catch (e) {
          this.disabled = false
          console.log(e)
          store.dispatch('toast/show')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
