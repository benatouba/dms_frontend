<template>
    <v-app id="inspire">
        <v-main>
            <v-container class="fill-height">
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="12" md="8">
                        <v-card id="login-card" class="elevation-5">
                            <v-toolbar id="header" color="primary" flat>
                                <v-toolbar-title>{{ $t('login.title') }}</v-toolbar-title>
                            </v-toolbar>
                            <v-form ref="form" @submit.prevent="handleSubmit">
                                <v-card-text @keyup.enter="handleSubmit">
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
                                        :disabled="!username || !password"
                                        >{{ $t('buttons.login') }}</v-btn
                                    >
                                </v-card-actions>
                            </v-form>
                            <v-overlay
                                v-if="submitted & (alerts.info.status !== 1)"
                                class="text-center"
                                :absolute="absolute"
                                :opacity="0.9"
                            >
                               <!-- <v-row>
                                    <v-col>
                                        <strong v-for="(alert, key) in alerts.info.message" :key="key">
                                            {{ alert[0] }}
                                        </strong>
                                    </v-col>
                                </v-row>-->
                              <Notification>
                                <v-btn
                                    :class="`${alerts.info.type} white--text v-btn v-size--large`"
                                    @click="submitted = false; clearAlert"
                                >
                                    {{ $t('buttons.ok') }}
                                </v-btn>
                              </Notification>
                            </v-overlay>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Notification from "@/components/Notification";

export default {
    name: 'Login',
  components: {Notification},
  data() {
        return {
            username: null,
            password: null,
            submitted: false,
            loading: false,
            absolute: true,
            loginInfo: false,
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.account.token) {
            // this.clearAlert()
            next()
        } else {
            this.to = to
            this.showLoginInfo(true)
            next()
        }
    },
    computed: {
        ...mapState({
            alerts: state => state.alerts,
            account: state => state.account,
        }),
    },
    created() {
        if (this.account.token) {
            this.logout()
        }
        this.showLoginInfo(false)
    },
    methods: {
        ...mapActions({
            login: 'account/login',
            logout: 'account/logout',
            clearAlert: 'alerts/clear',
            showLoginInfo: 'alerts/showLoginInfo',
        }),
        handleSubmit() {
            this.submitted = true
            const { username, password } = this

            if (username && password) {
                this.login({ username, password })
            }
        },
    },
}
</script>
