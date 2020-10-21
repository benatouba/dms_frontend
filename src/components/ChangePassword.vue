<template>
    <v-container>
        <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
            <v-expansion-panels class="elevation-5">
                <v-expansion-panel color="primary" flat>
                    <v-expansion-panel-header>{{ $t('account.change_password') }}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-form>
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
                                    :label="$t('account.password')"
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
                                    :label="$t('account.password2')"
                                    name="password2"
                                    prepend-icon="lock"
                                    type="password"
                                />
                            </ValidationProvider>
                        </v-form>
                        <v-card-actions>
                            <v-btn
                                color="primary"
                                :disabled="invalid || !validated"
                                @click="passes(handleSubmit)"
                                @keyup.enter="passes(handleSubmit)"
                            >
                                {{ $t('buttons.send') }}
                            </v-btn>
                        </v-card-actions>
                        <v-overlay class="text-center" :absolute="absolute" :value="overlay" :opacity="1">
                          <Notification>
                            <v-btn
                                :class="`${alerts.info.type} white--text v-btn v-size--large`"
                                @click="$router.go(); overlay = false"
                            >
                                {{ $t('buttons.ok') }}
                            </v-btn>
                          </Notification>
                        </v-overlay>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </ValidationObserver>
    </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import Notification from './Notification'

Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule])
})

export default {
    name: 'ChangePassword',
    components: {
        ValidationObserver,
        ValidationProvider,
        Notification,
    },
    computed: {
      ...mapState({
        alerts: state => state.alerts,
        userId: state=> state.account.id
      })
    },
    methods: {
        ...mapActions({ patch: 'account/patch' }),
        handleSubmit() {
            this.submitted = true
            const password = this.password
            this.patch({ pk: this.userId, password })
            this.overlay = true
            // this.old_password = null
            this.password = null
            this.password2 = null
        },
    },
    data() {
        return {
            errors: [],
            // old_password: null,
            password: null,
            password2: null,
            submitted: false,
            // notification after submission
            absolute: true,
            overlay: false,
        }
    },
}
</script>
