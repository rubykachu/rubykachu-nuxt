<template>
  <div>
    <div class="editor-wrapper" :class="{ error: errorMessages ? 'error' : '' }">
      <vue-mce
        api-key="lwq5yuf334878gwfu3wgzkuc17y2w8l8ptjjo25zwcvmlpfc"
        :initialValue="initialValue"
        :init="config"
        @input="handleInput"
        @onBlur="handleBlur"
      ></vue-mce>
    </div>
    <template v-if="errorMessages != ''">
      <div class="v-text-field__details">
        <div class="v-messages theme--light error--text" role="alert">
          <div class="v-messages__wrapper">
            <div class="v-messages__message">{{ errorMessages }}</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// https://codepen.io/Eazymov/pen/MEzGYv
import VueMce from '@tinymce/tinymce-vue'

const config = {
  height: 500,
  inline: false,
  fontsize_formats: '8px 10px 12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 34px 38px 42px 48px 54px 60px',
  plugins: [
    'powerpaste advcode advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen hr',
    'insertdatetime media table paste code help wordcount codesample emoticons'
  ],
  toolbar:
    'formatselect| bold italic strikethrough forecolor backcolor removeformat| hr emoticons|\
           link media image tox codesample| alignleft aligncenter | bullist numlist | fullscreen preview code|',
  codesample_languages: [
    { text: 'HTML/XML', value: 'markup' },
    { text: 'JavaScript', value: 'javascript' },
    { text: 'CSS', value: 'css' },
    { text: 'Ruby', value: 'ruby' },
    { text: 'YAML', value: 'yaml' },
    { text: 'Python', value: 'python' },
    { text: 'SQL', value: 'sql' },
    { text: 'Bash', value: 'bash' }
  ],
  image_advtab: false,
  menubar: true
}
export default {
  components: {
    VueMce
  },
  props: {
    initialValue: String,
    errorMessages: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    config
  }),
  watch: {
    editor(f, t) {
      console.log(f)
    }
  },
  methods: {
    handleInput(editor) {
      this.$emit('input', editor)
    },
    handleBlur(editor) {
      this.$emit('blur', editor)
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-wrapper {
  margin-bottom: 8px;
}
</style>

<style lang="scss">
.error {
  .tox-tinymce,
  .tox-statusbar {
    border-color: #df3a12 !important;
    * {
      border-color: #df3a12 !important;
      color: #df3a12 !important;
      fill: #df3a12 !important;
    }
  }
}
</style>
