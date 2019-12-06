import moment from 'moment'
import { required, minLength, numeric } from 'vuelidate/lib/validators'

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
      category_id: { required },
      created_at: { required },
      reading_time: { required, numeric },
      content: {
        required,
        minLength: minLength(30)
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
  }
}
