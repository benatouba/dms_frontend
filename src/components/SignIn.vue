<template>
    <v-app id="inspire">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12">
                            <v-toolbar color="primary darken-2" flat>
                                <v-toolbar-title>{{ 'InsertMsg' }}</v-toolbar-title>
                            </v-toolbar>
                            <v-form ref="form" @submit.prevent="handleSubmit">
                                <v-card-text>
                                    <v-text-field
                                        v-model="username"
                                        label="Username"
                                        name="username"
                                        prepend-icon="person"
                                        class="form-control"
                                        :class="{ 'is-invalid': submitted && !username }"
                                        type="text"
                                    />
                                    <div v-show="submitted && !username" class="invalid-feedback">
                                        Username is required
                                    </div>
                                    <v-text-field
                                        v-model="password"
                                        id="password"
                                        label="Password"
                                        name="password"
                                        prepend-icon="lock"
                                        class="form-control"
                                        :class="{ 'is-invalid': submitted && !password }"
                                        type="password"
                                    />
                                    <div v-show="submitted && !password" class="invalid-feedback">
                                        Password is required
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <router-link to="/register" class="btn btn-link">Register</router-link>
                                    <v-spacer />
                                    <v-btn color="primary darken-2" @click="handleSubmit" :disabled="isLoggedIn"
                                        >Login</v-btn
                                    >
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    name: 'SignIn',
    data() {
        return {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: '',
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.isLoggedIn) {
            next()
        } else {
            this.to = to
            this.toggleLoginInfo()
            next()
        }
    },
    computed: {
        ...mapState({
            status: 'accounts/status',
        }),
        ...mapGetters({
            isLoggedIn: 'accounts/isLoggedIn',
            loginInfo: 'alerts/loginInfo',
        }),
    },
    created() {
        if (this.isLoggedIn) {
            this.logout()
        }
        this.toggleLoginInfo()
    },
    methods: {
        ...mapActions({
            login: 'accounts/login',
            logout: 'accounts/logout',
            toggleLoginInfo: 'alerts/toggleLoginInfo',
        }),
        // eslint-disable-next-line no-unused-vars
        handleSubmit(e) {
            // e.preventDefault()
            this.submitted = true
            const { username, password } = this

            if (username && password) {
                this.login({ username, password })
            }
        },
    },
}
</script>

<!--<style scoped>-->
<!--h1 {-->
<!--  color: #294993;-->
<!--}-->
<!--</style>-->
