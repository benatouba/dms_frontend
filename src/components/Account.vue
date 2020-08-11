<template>
    <v-container fluid class="text--primary">
        <h1 class="ma-5 text--primary">{{ $t('account.title') }}</h1>
        <v-card>
            <v-card-title>
                <v-avatar class="ma-5">
                    <v-icon right color="primary" x-large>mdi-account-circle</v-icon>
                </v-avatar>
                <span>{{ account.username }}</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-for="(item, key) in getShowInfo(account)" :key="key" dense>
                <v-row cols="12" align="center" dense>
                    <v-col md="3" sm="4" xs="6">
                        <!--NOTE: We use the register-components messages DRY reasons-->
                        <strong> {{ $t(`register.${key}`) }}</strong>
                    </v-col>
                    <v-col md="3" sm="4" xs="6">
                        <click-to-edit
                            :value="item"
                            @changeInfo="handleInfoChange($event, key)"
                        >
                        </click-to-edit>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-text>
              <v-row cols="12" align="center">
                <v-col md="3" sm="4" xs="6">
                  <!--NOTE: We use the register-components messages DRY reasons-->
                  <strong> {{ $t(`register.institutions`) }}</strong>
                </v-col>
                <v-col class="text-no-wrap"  justify="end" cols="6" sm="3">
                  <span>{{ list(account.institutions) }}</span>
                  <!--<v-col>
                  <v-btn>Request institution</v-btn>
                  </v-col>-->
                </v-col>
              </v-row>
              <v-row cols="12" align="center">
                <v-col md="3" sm="4" xs="6">
                  <!--NOTE: We use the register-components messages DRY reasons-->
                  <strong> {{ $t(`register.groups`) }}</strong>
                </v-col>
                <v-col class="text-no-wrap"  cols="6" sm="3">
                  <span>{{ list(account.groups) }}</span>
                </v-col>
                <!--<v-col>
                  <v-btn>Request group</v-btn>
                </v-col>-->
              </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
// TODO: activate password change request
// TODO: add group change request
import {mapActions, mapState} from 'vuex'
import ClickToEdit from "@/components/ClickToEdit"

export default {
  name: 'Account',
  components: {ClickToEdit},
  computed: {
        ...mapState({
            account: state => state.account,
        }),
    },
    methods: {
        ...mapActions({
          patch: 'account/patch',
          info: 'account/info',
        }),
        handleInfoChange(newInfo, field) {
            if (newInfo !== this.account[field]) {
                let toPatch = {pk: this.account.id}
                toPatch[field] = newInfo
                this.patch(toPatch)
            }
        },
        getShowInfo(data) {
            let newObj = Object.assign({}, data)
            delete newObj.username
            delete newObj.institutions
            delete newObj.groups
            delete newObj.is_superuser
            delete newObj.id
            delete newObj.token
            delete newObj['is_active']
            return newObj
        },
        list(data) {
          let list = []
          data.forEach(x => list.push(x.name))
          return list.join()
        }
    },
  data() {
      return {
        newInfo: null,
      }
  },
  mounted() {
    this.info(this.account.id)
  }
}
</script>