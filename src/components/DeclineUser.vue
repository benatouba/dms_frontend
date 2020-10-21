<template>
    <v-main>
        <v-container class="fill-height">
          <h1>{{ $t('manage_user.decline_title')}}</h1>
          <v-row>
          <span class="ma-3">
            {{ $t('manage_user.text')}}
          </span>
          </v-row>
          <v-divider></v-divider>
            <v-row align="center" justify="center">
                <v-col>
                  <v-btn
                      class="ma-4"
                      color="warning"
                      @click="manage(token)"
                  >
                        {{ $t('manage_user.decline')}}
                  </v-btn>
                  <router-link
                      to="/">
                    {{ $t('buttons.cancel')}}
                  </router-link>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'DeclineUser',
  data() {
    return {
      submitted: false,
      absolute: true,
      loginInfo: false,
      token: this.$route.params.token
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
  },
  methods: {
    ...mapActions({
      clearAlert: 'alerts/clear',
      showLoginInfo: 'alerts/showLoginInfo',
      manage: 'users/manage',
    }),
  },
}
</script>
