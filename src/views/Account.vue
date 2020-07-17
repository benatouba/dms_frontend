<template>
    <div class="home">
        <v-container class="mx-4 primary--text">
            <Account></Account>
            <v-divider></v-divider>
<!--            <ChangePassword />-->
<!--            <v-divider></v-divider>-->
<!--            <ChangeGroups />-->
        </v-container>
    </div>
</template>

<script>
import Account from '../components/Account'
// import ChangePassword from '../components/ChangePassword'
// import ChangeGroups from '../components/ChangeGroups'
import { mapState} from "vuex"

export default {
    name: 'AccountView',
    components: {
        Account,
        // ChangePassword,
        // ChangeGroups
    },
    computed: {
        ...mapState({
            account: state => state.accounts
        })
    },
}
</script>
