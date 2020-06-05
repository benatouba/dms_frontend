<template>
    <v-app class="secondary">
        <Navbar />
        <v-content>
            <div v-if="alerts.message" :class="`alert ${alerts.type}`">{{ alerts.message }}</div>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import { mapActions, mapState } from 'vuex'
export default {
    name: 'App',
    components: { Navbar },
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
