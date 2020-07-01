<template>
    <v-app class="primary">
        <Navbar />
        <v-main style="margin: auto; width: 80%;">
            <LoginInfo v-if="!isLoggedIn && loginInfo" />
            <Notification />
            <router-view></router-view>
        </v-main>
        <Footer />
    </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import LoginInfo from './components/LoginInfo'
import Footer from './components/Footer'
import { mapActions, mapState, mapGetters } from 'vuex'
import Notification from './components/Notification';
export default {
    name: 'App',
    components: {Notification, Navbar, LoginInfo, Footer },
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
