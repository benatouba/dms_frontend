<template>
  <v-icon
      :color="color"
      small
      depressed
      v-if="active"
  >
    {{ icons.active }}
  </v-icon>
  <v-icon
      :color="color"
      small
      depressed
      v-else
  >
    {{ icons.inactive }}
  </v-icon>
</template>

<script>
export default {
  name: "BStatusIcon",
  props: {
    active: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: 'secondary',
    },
    icons: {
      type: Object,
    }
  }
}
</script>

<style scoped>

</style>