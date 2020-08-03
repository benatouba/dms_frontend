<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="date" prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" :date="date" @click="$emit('change', $event.target.date)">
                OK
            </v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script>
export default {
    name: 'DatePicker',
    model: {
        prop: 'date',
        event: 'change',
    },
    props: {
        date: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            menu: false,
        }
    },
}
</script>
