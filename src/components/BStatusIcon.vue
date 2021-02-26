<template>
    <v-tooltip top>
        <template #activator="{ on, attrs }">
            <v-icon :color="color" small depressed v-bind="attrs" v-on="on">
                {{ icon }}
            </v-icon>
        </template>
        <span v-if="!!tooltip">{{ tooltip }}</span>
    </v-tooltip>
</template>

<script>
export default {
    name: 'BStatusIcon',
    props: {
        color: {
            type: String,
            default: 'secondary',
        },
        icon: {
            type: String,
            default: 'mdi-exclamation',
        },
        tooltip: {
            type: String,
            default: '',
        },
    },
}
</script>

<style scoped></style>

