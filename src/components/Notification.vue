<template>
    <v-alert v-if="alerts.message" border="left" :class="alerts.type">
        {{ alerts.message }}
    </v-alert>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Notification',
    computed: {
        ...mapState({
            alerts: state => state.alerts,
        }),
    },
    methods: {
        ...mapActions({
            clearAlert: 'alerts/clear',
        }),
    },
    watch: {
        $route() {
            // clear alert on location change
            this.clearAlert()
        },
    },
}
</script>
