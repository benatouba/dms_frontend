<template>
    <div class="home">
        <v-container class="mx-4 primary--text">
            <Account />
<!--            <ChangePassword />-->
        </v-container>
    </div>
</template>

<script>
import Account from '../components/Account'
// import ChangePassword from '../components/ChangePassword'
export default {
    name: 'AccountView',
    components: {
        Account,
        // ChangePassword
    }
}
</script>
