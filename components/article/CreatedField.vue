<template>
  <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="computedDateFormattedMomentjs"
        clearable
        label="Ngày tạo"
        readonly
        v-on="on"
        @click:clear="date = null"
        prepend-icon="mdi-calendar"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" @change="menu1 = false"></v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment'
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu1: false
  }),

  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    },
    computedDateFormattedDatefns() {
      return this.date ? format(this.date, 'dddd, MMMM Do YYYY') : ''
    }
  }
}
</script>
