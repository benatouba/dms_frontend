<template>
  <v-tooltip left>
    <template v-slot:activator="{ on: onTooltip }">
      <v-menu
          rounded
          v-on="onTooltip"
      >
        <template v-slot:activator="{ attrs, on: onMenu }">
          <v-btn
              icon
              depressed
              x-small
              v-bind="attrs"
              v-on="{ ...onMenu, ...onTooltip }"
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
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "BRadioButtonWithMenu",
  props: {
    items: {
      type: Array,
    },
    tooltip: {
      type: String,
      default: '',
    }
  },
}
</script>

<style scoped>

</style>