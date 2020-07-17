<template>
    <v-container fluid class="text--primary">
        <h1 class="ma-5 text--primary">{{ $t('account.title') }}</h1>
            <v-card>
                <v-card-title>
                    <v-avatar class="ma-5">
                        <v-icon right color="primary" x-large>mdi-account-circle</v-icon>
                    </v-avatar>
                    <span>{{ accountInfo.username}}</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text
                        v-for="(item, key) in getShowInfo(accountInfo)"
                        :key="key"
                        dense
                >
                    <v-row dense align="center">
                        <v-col
                                class="text-no-wrap"
                                cols="3"
                                sm="3"
                        >
<!--                            NOTE: We use the register-components messages DRY reasons-->
                            <strong> {{ $t(`register.${key}`) }}</strong>
                        </v-col>
                        <v-col
                                sm="3"
                                md="3"
                        >
                            <span v-for="(field, id) of item" :key="id">{{ field }}</span>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
    </v-container>
</template>

<script>
    // TODO: activate password change request
    // TODO: add group change request
import {mapActions, mapState} from "vuex";

export default {
    name: 'Account',
    computed: {
        ...mapState({
            account: state => state.accounts
        }),
    },
    methods: {
        ...mapActions({
            getInfo: 'accounts/info'
        }),
        handlePasswordChange() {
        },
        handleGroupChange() {
        },
        getShowInfo(data) {
            let newDict = Object.assign({}, data)
            newDict.groups = []
            data.groups.forEach(obj => {
                newDict.groups.push(obj.name)
                newDict.groups.push(' ')
            })
            delete newDict.username
            delete newDict.is_superuser
            delete newDict.id
            delete newDict['is_active']
            return newDict
        },
    },
    data() {
        return {
            accountInfo: null
        }
    },
    async created() {
        this.accountInfo = await this.getInfo(this.account.id)
    },
}
</script>

<style>
    .key{
        text-transform: capitalize;
    }
</style>
