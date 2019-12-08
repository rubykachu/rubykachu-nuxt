import moment from 'moment'
import {
  required,
  minLength,
  maxLength,
  numeric
} from 'vuelidate/lib/validators'

const maxLenghtDescription = 145
const minLengthContent = 100
export default {
  async asyncData({ store }) {
    const resultCategories = await store.dispatch('category/getCategories')
    return { categories: resultCategories }
  },
  validations: {
    article: {
      title: {
        required,
        minLength: minLength(10)
      },
      category: { required },
      created_at: { required },
      reading_time: { required, numeric },
      description: {
        required,
        maxLength: maxLength(maxLenghtDescription)
      },
      content: {
        required,
        minLength: minLength(minLengthContent)
      }
    }
  },
  computed: {
    formatCreatedAt() {
      return this.article.created_at
        ? moment(this.article.created_at).format('MMM D, YYYY')
        : ''
    },
    msgSelectCategoryInvalid() {
      if (!this.$v.article.category.$error) return
      if (!this.$v.article.category.required) return 'Vui lòng chọn danh mục'
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
    msgDescriptionInvalid() {
      if (!this.$v.article.description.$error) return
      if (!this.$v.article.description.required) return 'Vui lòng nhập mô tả'
      if (!this.$v.article.description.maxLength)
        return `Mô tả quá dài (tối đa ${maxLenghtDescription} ký tự)`
    },
    msgContentInvalid() {
      if (!this.$v.article.content.$error) return
      if (!this.$v.article.content.required) return 'Vui lòng nhập nội dung'
      if (!this.$v.article.content.minLength)
        return `Nội dung quá ngắn (tối thiểu ${minLengthContent} ký tự)`
    }
  },
  methods: {
    selectedColor(defaultColor) {
      return this.article.color ? this.article.color : defaultColor
    }
  }
}
