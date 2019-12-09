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
                :success-messages="msgCreateSuccessCategory"
                @focus="resetCategory"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Đóng</v-btn>
        <v-btn color="blue darken-1" text @click="createCategory">Tạo danh mục</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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
      toggleDialog: this.dialog,
      msgCategoryInvalid: '',
      msgCreateSuccessCategory: '',
      category: null
    }
  },
  watch: {
    dialog(value) {
      this.toggleDialog = value
    }
  },
  validations: {
    category: { required }
  },
  methods: {
    closeDialog() {
      this.toggleDialog = false
      this.resetCategory()
      this.$emit('click:close')
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
          console.log(e)
        }
      } else {
        this.msgCategoryInvalid = 'Vui lòng nhập danh mục'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
