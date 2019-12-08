<template>
  <v-dialog v-model="toggleDialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <p class="headline">Chọn màu danh mục</p>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-color-picker
              v-model="color"
              dark
              flat
              show-swatches
              hide-mode-switch
              mode="hexa"
              width="600px"
            ></v-color-picker>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Đóng</v-btn>
        <v-btn color="blue darken-1" text @click="chooseColor">Đồng ý</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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
      color: null
    }
  },
  watch: {
    dialog(value) {
      this.toggleDialog = value
    }
  },
  methods: {
    closeDialog() {
      this.toggleDialog = false
      this.$emit('click:close')
    },
    chooseColor() {
      this.closeDialog()
      this.$emit('input', this.color.hex)
    }
  }
}
</script>
