<template>
        <v-banner
                app
                v-if="alerts.info.type && banner"
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
                                v-show="info[0] !== 'status' && info[0] !== 'type'"
                                v-for="info of Object.entries(this.alerts.info)"
                                :key="info[0]"
                        >
                            {{ reformatAlert(info[1]) }}
                        </span>
                </v-col>
            </v-row>
        </v-banner>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { isObj } from '../helpers/treebuilder'

export default {
    name: 'Notification',
    computed: {
        ...mapState({
            alerts: state => state.alerts,
        }),
    },
    props: {
        banner: {
            type: Boolean,
            required: true,
        }
    },
    methods: {
        ...mapActions({
            clearAlert: 'alerts/clear',
        }),
        reformatAlert(alert) {
            if (isObj(alert)) {
                return Object.values(alert)[0]
            } else {
                return alert
            }
        }
    },
    watch: {
        $route() {
            // clear alert on location change
            this.clearAlert()
        },
    },
}
</script>
