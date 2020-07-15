<template>
    <div class="home">
        <v-container class="mx-4 primary--text">
            <Account></Account>
            <v-divider></v-divider>
<!--            <ChangePassword />-->
            <v-divider></v-divider>
            <ChangeGroups />
        </v-container>
    </div>
</template>

<script>
import Account from '../components/Account'
// import ChangePassword from '../components/ChangePassword'
import ChangeGroups from '../components/ChangeGroups'
import { mapState} from "vuex"

export default {
    name: 'AccountView',
    components: {
        Account,
        // ChangePassword,
        ChangeGroups
    },
    computed: {
        ...mapState({
            account: state => state.accounts
        })
    },
    methods: {
        assignIds(obj) {
            let newObj = {}
            let counter = 1
            for (let item of Object.entries(obj)) {
                if (typeof item[1] === 'object' && !Array.isArray(item[1])) {
                    newObj.id = counter
                    newObj.name = item
                    counter += 1
                } else if (typeof item[1] === 'object' && Array.isArray(item[1])) {
                    this.assignIds(item[1])
                }
            }
        }
    }
}
</script>
