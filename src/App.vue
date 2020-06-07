<template>
    <v-app class="secondary">
        <Navbar />
        <v-content>
            <LoginInfo v-show="!isLoggedIn | disableLoginInfo" />
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import LoginInfo from './components/LoginInfo'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
    name: 'App',
    components: { Navbar, LoginInfo },
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
            disableLoginInfo: 'alerts/disableLoginInfo',
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
