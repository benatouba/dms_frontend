<template>
    <v-btn ripple depressed icon class="mx-5" :href="href" target="_blank">
        <slot></slot>
        <v-icon x-small>mdi-open-in-new</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: 'BLinkButton',
    props: {
        href: {
            type: String,
            required: true,
        },
    },
}
</script>
>
