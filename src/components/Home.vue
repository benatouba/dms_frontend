<template>
    <div>
        <h1>Hi {{ account.user.first_name }}!</h1>
        <p>You're logged in</p>
        <em v-if="users.loading">Loading users...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{ users.error }}</span>
        <ul v-if="users.items">
            <li v-for="user in users.items" :key="user.id">
                {{ user.first_name + ' ' + user.last_name }}
                <span v-if="user.deleting"><em> - Deleting...</em></span>
                <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{ user.deleteError }}</span>
                <span v-else> - <a @click="deleteUser(user.id)" class="text-danger">Delete</a></span>
            </li>
        </ul>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'Home',
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all,
        }),
    },
    created() {
        this.listUsers()
    },
    methods: {
        ...mapActions('users', {
            listUsers: 'list',
            deleteUser: 'delete',
        }),
    },
}
</script>
