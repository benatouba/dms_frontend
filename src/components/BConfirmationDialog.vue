<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
  >
    <template v-slot:activator="{ on, attrs }">
        <v-btn
            class="mx-1"
            :color="color"
            :disabled="disabled"
            v-bind="attrs"
            v-on="on"
        >
          <slot></slot>
        </v-btn>
    </template>
    <v-card>
      <slot name="title">
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      </slot>
      <slot name="text">
        <v-card-text>
          {{ body }}
        </v-card-text>
      </slot>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="secondary"
            text
            @click="dialog=false">
          {{ $t('buttons.cancel') }}
        </v-btn>
        <slot name="confirmation">
          <v-btn
              color="primary"
              text
              @click="$emit('confirm'); dialog=false"
          >
            {{ $t('buttons.confirm') }}
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "BConfirmationDialog",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'primary'
    },
    title: {
      type: String,
      default: 'Confirmation needed'
    },
    body: {
      type: String,
      default: 'Are you sure, you want to do this?'
    }
  },
  data() {
    return {
      dialog: false,
    }
  }
}
</script>

<style scoped>

</style>