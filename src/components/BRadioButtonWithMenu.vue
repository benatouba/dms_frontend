<template>
  <v-menu
      rounded
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
          icon
          depressed
          x-small
          v-bind="attrs"
          v-on="on"
      >
        <slot name="icon"></slot>
      </v-btn>
    </template>
    <v-card>
      <v-list dense>
        <div
            v-for="item in items"
            :key="item.value"
        >
          <v-list-item
              v-if="!!item.text"
              @click="$emit('clickItem', item.value)"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "BRadioButtonWithMenu",
  props: {
    items: {
      type: Array,
    }
  },
}
</script>

<style scoped>

</style>