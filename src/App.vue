<template>
    <v-app class="primary">
        <Navbar />
        <v-main style="margin: auto; width: 80%;">
            <LoginInfo v-if="!account.token && alerts.loginInfo" />
            <Notification :banner="showErrorBanner"></Notification>
            <router-view></router-view>
        </v-main>
        <Footer />
    </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import LoginInfo from './components/LoginInfo'
import Footer from './components/Footer'
import { mapActions, mapState } from 'vuex'
import Notification from './components/Notification';
export default {
    name: 'App',
    components: { Notification, Navbar, LoginInfo, Footer },
    computed: {
        ...mapState({
            alerts: state => state.alerts,
            account: state => state.account,
            showErrorBanner: state => state.errorBanner
        })
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
            this.$store.commit('showErrorBanner', true)
        },
    },
}
</script>
