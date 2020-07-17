<template>
        <v-banner
                app
                v-if="alerts.info.type && alerts.loginInfo"
                :color="alerts.info.type"
                rounded
                sticky
                :elevation="5"
                style="z-index: 10;"
            >
            <v-row align="center">
                <v-col cols="12">
                    <v-btn
                            icon
                            @click="clearAlert"
                            rounded
                    >
                        <v-icon>
                            mdi-close-circle
                        </v-icon>
                    </v-btn>
                        <span
                                v-for="info of Object.entries(this.alerts.info)"
                                :key="info[0]"
                                v-show="info[1]">
                            {{ info[1] }}
                        </span>
                </v-col>
            </v-row>
        </v-banner>
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
