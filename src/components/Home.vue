<template>
    <v-container>
        <h1>Hi {{ this.user }}!</h1>
        Welcome to the
        <!--<em v-if="users.loading">Loading users...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{ users.error }}</span>
        <ul v-if="users.items">
            <li v-for="user in users.items" :key="user.id">
                {{ user.first_name + ' ' + user.last_name }}
                <span v-if="user.deleting"><em> - Deleting...</em></span>
                <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{ user.deleteError }}</span>
                <span v-else> - <a @click="deleteUser(user.id)" class="text-danger">Delete</a></span>
            </li>
        </ul>-->
    </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
    name: 'Home',
    computed: {
        ...mapState({
            accounts: state => state.accounts,
            users: state => state.users.all,
        }),
        ...mapGetters({
            user: 'accounts/user',
            status: 'accounts/status',
        }),
    },
    methods: {
        ...mapActions('users', {
            listUsers: 'list',
            deleteUser: 'delete',
        }),
    },
}
</script>
