<template>
    <v-app class="primary">
        <Navbar />
        <v-content style="margin: auto; width: 80%;">
            <LoginInfo v-if="!isLoggedIn && loginInfo" />
            <v-alert v-if="alerts.message" text type="info" :class="`d-flex alert ${alerts.type}`">
                {{ alerts.message }}
            </v-alert>
            <router-view></router-view>
        </v-content>
        <Footer />
    </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import LoginInfo from './components/LoginInfo'
import Footer from './components/Footer'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
    name: 'App',
    components: { Navbar, LoginInfo, Footer },
    computed: {
        ...mapState({
            alerts: state => state.alerts,
        }),
        ...mapGetters({
            isLoggedIn: 'accounts/isLoggedIn',
            loginInfo: 'alerts/loginInfo',
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
