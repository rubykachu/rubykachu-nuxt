<template>
  <v-combobox
    v-model="select"
    :items="items"
    label="Danh mục"
    prepend-icon="mdi-cards"
    error-messages=""
    multiple
    outlined
    dense
  ></v-combobox>
</template>

<script>
export default {
  data() {
    return {
      select: ['Vuetify', 'Programming'],
      items: ['Programming', 'Design', 'Vue', 'Vuetify']
    }
  }
}
</script>

<style lang="scss" scoped></style>
