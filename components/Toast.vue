<template>
  <div>
    <v-snackbar v-model="status" :timeout="timeout" bottom>
      {{ toast.msgError }}
      <v-btn color="primary" text @click="close">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    timeout: 4000,
    status: false
  }),
  // Update status if state is changed
  created() {
    this.$store.watch(
      state => state.toast.hasError,
      newVal => (this.status = newVal)
    )
  },
  // Update state if status is changed
  watch: {
    status(newVal) {
      if (!newVal) {
        this.$store.dispatch('toast/hide')
      }
    }
  },
  computed: mapState(['toast']),
  methods: {
    close() {
      this.$store.dispatch('toast/hide')
    }
  }
}
</script>
