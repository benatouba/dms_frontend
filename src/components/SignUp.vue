<template>
    <v-app id="inspire">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
                            <v-card class="elevation-12">
                                <v-toolbar color="primary darken-2" flat>
                                    <v-toolbar-title>{{ $t('welcomeMsg', name) }}</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-form>
                                        <ValidationProvider
                                            name="username"
                                            rules="required|max:10"
                                            v-slot="{ errors, valid }"
                                        >
                                            <v-text-field
                                                v-model="user.name"
                                                :counter="10"
                                                :error-messages="errors"
                                                :success="valid"
                                                label="Username"
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
                                                v-model="user.first_name"
                                                :error-messages="errors"
                                                :success="valid"
                                                label="First Name"
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
                                                v-model="user.last_name"
                                                :error-messages="errors"
                                                :success="valid"
                                                label="Last Name"
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
                                                v-model="user.institution"
                                                :error-messages="errors"
                                                :success="valid"
                                                label="Institution"
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
                                                v-model="user.email"
                                                :error-messages="errors"
                                                :success="valid"
                                                label="E-Mail"
                                                name="email"
                                                prepend-icon="email"
                                                required
                                            />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            name="Phone"
                                            rules="required|phone"
                                            v-slot="{ errors, valid }"
                                        >
                                            <v-text-field
                                                v-model="user.phone"
                                                :error-messages="errors"
                                                :success="valid"
                                                label="Phone Number"
                                                name="phone"
                                                prepend-icon="phone"
                                                required
                                            />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            name="password"
                                            rules="required|min:8"
                                            v-slot="{ errors, valid }"
                                        >
                                            <v-text-field
                                                v-model="user.password"
                                                :error-messages="errors"
                                                :success="valid"
                                                id="password"
                                                label="Password"
                                                name="password"
                                                prepend-icon="lock"
                                                type="password"
                                                required
                                            />
                                        </ValidationProvider>
                                        <ValidationProvider
                                            name="password2"
                                            rules="required|min:8"
                                            v-slot="{ errors, valid }"
                                        >
                                            <v-text-field
                                                v-model="user.password2"
                                                :error-messages="errors"
                                                :success="valid"
                                                id="password2"
                                                label="Repeat Password"
                                                name="password2"
                                                prepend-icon="lock"
                                                type="password"
                                                required
                                            />
                                        </ValidationProvider>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn @click="clear">{{ $t('clear') }}</v-btn>
                                    <router-link to="/login" class="btn btn-link">Cancel</router-link>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary darken-2"
                                        :disabled="invalid || !validated"
                                        @click="passes(handleSubmit)"
                                    >
                                        {{ $t('register') }}
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </ValidationObserver>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
    name: 'SignIn',
    components: {
        ValidationObserver,
        ValidationProvider,
    },
    computed: {
        ...mapState('account', ['status']),
    },
    methods: {
        ...mapActions('account', ['register']),
        async clear() {
            this.name = this.email = this.first_name = this.last_name = this.institution = ''
            requestAnimationFrame(() => {
                this.$refs.obs.reset()
            })
        },
        async handleSubmit() {
            this.submitted = true
            this.register(this.user)
        },
    },
    data() {
        return {
            user: {
                name: '',
                password: '',
                password2: '',
                email: '',
                phone: '',
                first_name: '',
                last_name: '',
                institution: '',
            },
            submitted: false,
        }
    },
}
</script>
