<template>
    <v-container fluid class="text--primary">
        <h1 class="ma-5 text--primary">{{ $t('account.title') }}</h1>
            <v-card>
                <v-card-title>
                    <v-avatar class="ma-5">
                        <v-icon right color="primary" x-large>mdi-account-circle</v-icon>
                    </v-avatar>
                    <span>{{ accountInfo[0].username}}</span>
                </v-card-title>
                <v-card-text
                        v-for="(field, key) in getShowInfo(accountInfo[0])"
                        :key="key"
                >
                    <v-divider></v-divider>
                    <v-row>
                        <v-col dense
                                class="text-no-wrap"
                                cols="3"
                                sm="3"
                        >
<!--                            NOTE: We use the register-components messages DRY reasons-->
                            <p class="key"> {{ $t(`register.${key}`) }}</p>
                        </v-col>
                        <v-col
                                sm="3"
                                md="3"
                        >
                            <b>{{ field }}</b>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'Account',
    computed: {
        ...mapActions({
            getInfo: 'accounts/info'
        }),
    },
    methods: {
        handlePasswordChange() {
        },
        getShowInfo(data) {
            let newDict = Object.assign({}, data)
            delete newDict.groups
            delete newDict.username
            return newDict
        },
    },
    async mounted() {
        this.accountInfo = await this.$store.dispatch('accounts/info', localStorage.getItem('user'))
        console.log(this.accountInfo)
    },
    data() {
        return {
            accountInfo: null,
        }
    },
}
</script>

<style>
    .key{
        text-transform: capitalize;
    }
</style>
