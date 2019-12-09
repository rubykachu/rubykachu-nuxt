<template>
  <div>
    <v-snackbar v-model="toast.hasError" :timeout="timeout" bottom>
      {{ toast.msgError }}
      <v-btn color="pink" text @click="close">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    timeout: 6000
  }),
  computed: mapState(['toast']),
  methods: {
    close() {
      this.$store.dispatch('toast/hide')
    }
  }
}
</script>
