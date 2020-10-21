<template>
    <v-app id="inspire">
        <v-main>
            <v-container class="fill-height">
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="12" md="8">
                      <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
                        <v-card id="reset-pw-card" class="elevation-5">
                            <v-toolbar id="header" color="primary" flat>
                                <v-toolbar-title>{{ $t('reset_password.title') }}</v-toolbar-title>
                            </v-toolbar>
                            <v-form ref="form" @submit.prevent="handleSubmit">
                                <v-card-text @keyup.enter="handleSubmit">
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
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn
                                        id="login_button"
                                        color="primary"
                                        @click="passes(handleSubmit)"
                                        :disabled="!validated"
                                        >{{ $t('buttons.send') }}</v-btn
                                    >
                                </v-card-actions>
                            </v-form>
                            <v-overlay
                                v-if="submitted"
                                class="text-center"
                                :absolute="absolute"
                                :opacity="0.9"
                            >
                              <Notification>
                                <v-btn
                                    :class="`${alerts.info.type} white--text v-btn v-size--large`"
                                    @click="$router.push('/')"
                                >
                                    {{ $t('buttons.ok') }}
                                </v-btn>
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
import { mapActions, mapState } from 'vuex'
import Notification from "@/components/Notification";
import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {
  name: 'ResetPassword',
  components: {
    Notification,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      password: null,
      password2: null,
      submitted: false,
      absolute: true,
      loginInfo: false,
      validated: false,
    }
  },
  beforeRouteLeave(to, from, next) {
    this.to = to
    this.showLoginInfo(true)
    this.clearAlert()
    next()
  },
  computed: {
    ...mapState({
      alerts: state => state.alerts,
    }),
  },
  created() {
    this.showLoginInfo(false)
    console.log(this.$route.params.token)
  },
  methods: {
    ...mapActions({
      resetPassword: 'account/patch',
      clearAlert: 'alerts/clear',
      showLoginInfo: 'alerts/showLoginInfo',
    }),
    handleSubmit() {
      if (this.password) {
        this.submitted = true
        this.resetPassword({ password: this.password, token: this.$route.params.token, })
        if (this.alerts.info.status === 1) {
          this.submitted = false;
          this.clearAlert()
          this.$router.push('/')
        }
      }
    },
  },
}
</script>
