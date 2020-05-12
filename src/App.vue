<template>
    <v-app class="secondary">
        <Navbar />
        <v-content>
            <div v-if="alert.message" :class="`alert ${alert.type}`">{{ alert.message }}</div>
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
            alert: state => state.alert,
        }),
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear',
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
