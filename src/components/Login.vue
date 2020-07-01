<template>
    <v-app id="inspire">
        <v-main>
            <v-container class="fill-height">
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="12" md="8">
                        <v-card class="elevation-5">
                            <v-toolbar id="header" color="primary" flat>
                                <v-toolbar-title>{{ $t('login.title') }}</v-toolbar-title>
                            </v-toolbar>
                            <v-form ref="form" @submit.prevent="handleSubmit">
                                <v-card-text>
                                    <v-text-field
                                        v-model="username"
                                        :label="$t('login.username')"
                                        name="username"
                                        prepend-icon="person"
                                        class="username form-control"
                                        :class="{ 'is-invalid': submitted && !username }"
                                        type="text"
                                    />
                                    <div v-show="submitted && !username" class="invalid-feedback">
                                        {{ $t('login.user_missing') }}
                                    </div>
                                    <v-text-field
                                        v-model="password"
                                        :label="$t('login.password')"
                                        name="password"
                                        prepend-icon="lock"
                                        class="password form-control"
                                        :class="{ 'is-invalid': submitted && !password }"
                                        type="password"
                                    />
                                    <div v-show="submitted && !password" class="invalid-feedback">
                                        {{ $t('login.password_missing') }}
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <router-link to="/register" class="btn btn-link">{{
                                        $t('buttons.register')
                                    }}</router-link>
                                    <v-spacer />
                                    <v-btn
                                        class="login_button"
                                        color="primary"
                                        @click="handleSubmit"
                                        @keyup.enter="handleSubmit"
                                        :disabled="!username || !password"
                                        >{{ $t('buttons.login') }}</v-btn
                                    >
                                </v-card-actions>
                            </v-form>
                            <v-overlay class="text-center" :absolute="absolute" :value="overlay" :opacity="1">
                                <Notification />
                                <router-link
                                    to="/"
                                    class="primary white--text v-btn v-size--large"
                                    @click="overlay = false"
                                >
                                    {{ $t('buttons.confirm') }}
                                </router-link>
                            </v-overlay>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Notification from './Notification'
export default {
    name: 'Login',
    components: { Notification },
    data() {
        return {
            username: null,
            password: null,
            submitted: false,
            loading: false,
            error: '',
            absolute: true,
            overlay: false,
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
        handleSubmit() {
            this.submitted = true
            const { username, password } = this

            if (username && password) {
                this.login({ username, password })
            }
            this.overlay = true
        },
    },
}
</script>
