<template>
    <v-hover v-slot:default="{ hover }">
        <v-banner
                app
                v-if="alerts.message"
                :color="alerts.type"
                rounded
                sticky
                :elevation="hover ? 24 : 5"
                style="z-index: 10;"
            >
            <v-btn
                    icon
                    @click="clearAlert"
                    rounded
            >
                <v-icon>
                    mdi-close-circle
                </v-icon>
            </v-btn>
            {{ alerts.message }}
        </v-banner>
    </v-hover>
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
        })
    },
    watch: {
        $route() {
            // clear alert on location change
            this.clearAlert()
        },
    }
}
</script>
