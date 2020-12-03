<template>
    <v-app id="inspire">
        <v-main>
            <v-container class="fill-height">
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="12" md="8">
                        <v-card id="request-pw-card" class="elevation-5">
                            <v-toolbar id="header" color="primary" flat>
                                <v-toolbar-title>{{ $t('request_password.title') }}</v-toolbar-title>
                            </v-toolbar>
                            <v-subheader class="ma-3">{{ $t('request_password.info') }}</v-subheader>
                            <v-form ref="form" @submit.prevent="handleSubmit">
                                <v-card-text @keyup.enter="handleSubmit">
                                    <v-text-field
                                        v-model="userid"
                                        :label="$t('request_password.userid')"
                                        name="userid"
                                        prepend-icon="person"
                                        class="userid form-control"
                                        :class="{ 'is-invalid': submitted }"
                                        type="text"
                                    />
                                    <div v-show="submitted" class="invalid-feedback">
                                        {{ $t('request_password.userid_missing') }}
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn
                                        id="login_button"
                                        color="primary"
                                        @click="handleSubmit"
                                        :disabled="!userid"
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
                              <Notification
                                  v-for="info in alerts"
                                  :key="info.id"
                              >
                                <router-link to="/">
                                <v-btn
                                    :class="`${info.type} white--text v-btn v-size--large`"
                                    @click="submitted = false; clearAlert; $router.push('/')"
                                >
                                    {{ $t('buttons.ok') }}
                                </v-btn>
                                </router-link>
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
import Notification from "@/components/Notification"

export default {
  name: 'RequestPassword',
  components: { Notification },
  data() {
        return {
            userid: null,
            submitted: false,
            absolute: true,
            loginInfo: false,
        }
    },
    beforeRouteLeave(to, from, next) {
      this.to = to
      this.showLoginInfo(true)
      next()
    },
    computed: {
        ...mapState({
            alerts: state => state.alerts.info,
        }),
    },
    created() {
        this.showLoginInfo(false)
    },
    methods: {
        ...mapActions({
            requestPassword: 'account/requestPassword',
            clearAlert: 'alerts/clear',
            showLoginInfo: 'alerts/showLoginInfo',
        }),
        handleSubmit() {
            if (this.userid) {
              this.submitted = true
              this.requestPassword({userid: this.userid})
            }
        },
    },
}
</script>
