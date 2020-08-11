<template>
  <div>
      <v-text-field
          v-if="edit"
          :value="value"
          @blur="onSubmit($event.target.value)"
          @keyup.enter="onSubmit($event.target.value)"
          v-focus=""
      ></v-text-field>
      <v-text-field
          v-else-if="!edit && !value"
          :value="value"
          @click="edit = true"
      >
        {{ value }}
      </v-text-field>
      <v-text-field
          :value="value"
          v-else
          @click="edit = true"
      >
        {{ value }}
      </v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: null,
      default: ""
    },
  },
  data () {
    return {
      edit: false,
    }
  },
  methods: {
    onSubmit(target) {
      this.edit = false
      this.$emit('changeInfo', target)
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  },
}
</script>