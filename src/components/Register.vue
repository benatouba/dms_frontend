<template>
    <v-app id="inspire">
        <v-main>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="12" md="10" lg="8" xl="5">
                        <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
                            <v-card class="elevation-5">
                                <v-toolbar color="primary" flat>
                                    <v-toolbar-title>{{ $t('register.title') }}</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-form>
                                        <ValidationProvider
                                            name="username"
                                            rules="required|max:10"
                                            v-slot="{ errors, valid }"
                                        >
                                            <v-text-field
                                                v-model="username"
                                                :counter="10"
                                                :error-messages="errors"
                                                :success="valid"
                                                :label="$t('register.username')"
                                                name="username"
                                                prepend-icon="person"
                                                type="text"
                                                required
                                            />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            name="first_name"
                                            rules="required"
                                            v-slot="{ errors, valid }"
                                        >
                                            <v-text-field
                                                v-model="first_name"
                                                :error-messages="errors"
                                                :success="valid"
                                                :label="$t('register.first_name')"
                                                name="first_name"
                                                required
                                            />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            name="last_name"
                                            rules="required"
                                            v-slot="{ errors, valid }"
                                        >
                                            <v-text-field
                                                v-model="last_name"
                                                :error-messages="errors"
                                                :success="valid"
                                                :label="$t('register.last_name')"
                                                name="last_name"
                                                required
                                            />
                                        </ValidationProvider>
                                        <v-autocomplete
                                            v-model="institutions"
                                            :items="meta('institution')"
                                            item-text="acronym"
                                            item-value="acronym"
                                            label="Institutions"
                                            color="primary"
                                            multiple
                                        ></v-autocomplete>
                                        <v-autocomplete
                                            v-model="licenses"
                                            :items="meta('license')"
                                            item-text="short_name"
                                            item-value="short_name"
                                            label="Licenses"
                                            color="primary"
                                            multiple
                                        ></v-autocomplete>
                                        <ValidationProvider
                                            name="Email"
                                            rules="required|email"
                                            v-slot="{ errors, valid }"
                                        >
                                            <v-text-field
                                                v-model="email"
                                                :error-messages="errors"
                                                :success="valid"
                                                :label="$t('register.email')"
                                                name="email"
                                                prepend-icon="email"
                                                required
                                            />
                                        </ValidationProvider>
                                        <ValidationProvider name="Phone" rules="numeric|min:8" v-slot="{ errors }">
                                            <v-text-field
                                                v-model="phone_number"
                                                :error-messages="errors"
                                                :label="
                                                    $t('register.phone_number') +
                                                        ' (' +
                                                        $t('buttons.not_required') +
                                                        ')'
                                                "
                                                name="phone"
                                                prepend-icon="phone"
                                            />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            name="password"
                                            rules="required|min:8"
                                            ref="password"
                                            v-slot="{ errors, valid }"
                                        >
                                            <v-text-field
                                                v-model="password"
                                                :error-messages="errors"
                                                :success="valid"
                                                id="password"
                                                :label="$t('register.password1')"
                                                name="password"
                                                prepend-icon="lock"
                                                type="password"
                                                required
                                            />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            name="password2"
                                            rules="required|confirmed:password"
                                            vid="pw2"
                                            v-slot="{ errors, valid }"
                                        >
                                            <v-text-field
                                                v-model="password2"
                                                :error-messages="errors"
                                                :success="valid"
                                                id="password2"
                                                :label="$t('register.password2')"
                                                name="password2"
                                                prepend-icon="lock"
                                                type="password"
                                            />
                                        </ValidationProvider>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn @click="clear">{{ $t('buttons.clear') }}</v-btn>
                                    <router-link to="/login" class="btn btn-link ma-2">{{
                                        $t('buttons.cancel')
                                    }}</router-link>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary darken-2"
                                        :disabled="!validated"
                                        @click="passes(handleSubmit)"
                                        @keyup.enter="passes(handleSubmit)"
                                    >
                                        {{ $t('buttons.register') }}
                                    </v-btn>
                                </v-card-actions>
                                <v-overlay class="text-center" :absolute="absolute" :value="overlay" :opacity="0.8">
                                    <Notification>
                                        <router-link
                                            to="/"
                                            :class="`${alerts.info.type} white--text v-btn v-size--large`"
                                            @click="overlay = false"
                                        >
                                          {{ $t('buttons.ok') }}
                                        </router-link>
                                    </Notification>
                                </v-overlay>
                            </v-card>
                        </ValidationObserver>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import Notification from './Notification'

Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule])
})

export default {
    name: 'Register',
    components: {
        ValidationObserver,
        ValidationProvider,
        Notification,
    },
    computed: {
        ...mapState({
          status: state => state.account.status,
          alerts: state => state.alerts,
        }),
        ...mapGetters('queries', ['meta']),
    },
    methods: {
        ...mapActions({
            register: 'account/register',
            showLoginInfo: 'alerts/showLoginInfo',
            fetchMeta: 'queries/fetchMeta',
        }),
        async clear() {
            this.username = this.email = this.first_name = this.last_name = this.institutions = this.password = this.password2 = this.licenses = this.institutions = ''
            requestAnimationFrame(() => {
                this.$refs.obs.reset()
            })
        },
        handleSubmit() {
            this.submitted = true
            const user = {
                username: this.username,
                password: this.password,
                email: this.email,
                first_name: this.first_name,
                last_name: this.last_name,
                groups: []
            }
            if (this.phone_number) {
              user.phone_number = this.phone_number
            }
            this.institutions.forEach(item => {
              user.groups.push({name: item})
            })
            this.licenses.forEach(item => {
              user.groups.push({name: item})
            })
            this.register(user)
            this.overlay = true
        },
    },
    data() {
        return {
            errors: [],
            username: null,
            password: null,
            password2: null,
            email: null,
            phone_number: null,
            first_name: null,
            last_name: null,
            submitted: false,
            institutions: [],
            licenses: [],

            // notification after submission
            absolute: true,
            overlay: true,
        }
    },
    created() {
        this.showLoginInfo(false)
        this.fetchMeta('institution')
        this.fetchMeta('license')
    },
}
</script>
