<template>
    <v-container fluid class="text--primary">
        <h1 class="ma-5 text--primary">{{ $t('account.title') }}</h1>
            <v-card>
                <v-card-title>
                    <v-avatar class="ma-5">
                        <v-icon right color="primary" x-large>mdi-account-circle</v-icon>
                    </v-avatar>
                    <span>{{ account.username}}</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text
                        v-for="(item, key) in getShowInfo(account)"
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
import { mapState} from "vuex";

export default {
    name: 'Account',
    computed: {
        ...mapState({
            account: state => state.account
        }),
    },
    methods: {
        // ...mapActions({
        //     getInfo: 'account/info'
        // }),
        getShowInfo(data) {
            let newObj = Object.assign({}, data)
            let groups = []
            data.groups.forEach(x => groups.push(x.name))
            newObj.groups = groups.join()
            delete newObj.user
            delete newObj.isLoggedIn
            delete newObj.is_superuser
            delete newObj.id
            delete newObj.token
            delete newObj['is_active']
            return newObj
        },
    },
    // data() {
    //     return {
    //         accountInfo: null
    //     }
    // },
    // async created() {
    //     this.accountInfo = await this.getInfo(this.account.id)
    // },
}
</script>

<style>
    .key{
        text-transform: capitalize;
    }
</style>
