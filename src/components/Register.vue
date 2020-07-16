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
                                                v-model="name"
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
                                        <ValidationProvider
                                            name="institution"
                                            rules="required"
                                            v-slot="{ errors, valid }"
                                        >
                                            <v-text-field
                                                v-model="institution"
                                                :error-messages="errors"
                                                :success="valid"
                                                :label="$t('register.institution')"
                                                name="institution"
                                                required
                                            />
                                        </ValidationProvider>
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
                                        <ValidationProvider
                                            name="Phone"
                                            rules="required|numeric|min:8"
                                            v-slot="{ errors, valid }"
                                        >
                                            <v-text-field
                                                v-model="phone"
                                                :error-messages="errors"
                                                :success="valid"
                                                :label="$t('register.phone')"
                                                name="phone"
                                                prepend-icon="phone"
                                                required
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
                                        :disabled="invalid || !validated"
                                        @click="passes(handleSubmit)"
                                        @keyup.enter="passes(handleSubmit)"
                                    >
                                        {{ $t('buttons.register') }}
                                    </v-btn>
                                </v-card-actions>
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
                        </ValidationObserver>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
        ...mapState('accounts', ['status']),
    },
    methods: {
        ...mapActions({ register: 'accounts/register' }),
        async clear() {
            this.name = this.email = this.first_name = this.last_name = this.institution = ''
            requestAnimationFrame(() => {
                this.$refs.obs.reset()
            })
        },
        async handleSubmit() {
            this.submitted = true
            const user = {
                name: this.name,
                password: this.password,
                password2: this.password2,
                email: this.email,
                phone: this.phone,
                first_name: this.first_name,
                last_name: this.last_name,
                institution: this.institution,
            }
            this.register(user)
            this.overlay = true
        },
    },
    data() {
        return {
            errors: [],
            name: null,
            password: null,
            password2: null,
            email: null,
            phone: null,
            first_name: null,
            last_name: null,
            institution: null,
            submitted: false,
            // notification after submission
            absolute: true,
            overlay: false,
        }
    },
}
</script>
