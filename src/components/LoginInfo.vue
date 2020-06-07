<template>
    <!--    TODO: add button to disable login info box-->
    <v-alert class="d-flex" icon="mdi-account" border="bottom" colored-border text type="info" elevation="2">
        You're not logged in. You can only see data under public licenses. To see more data, please log in. If you don't
        have an account, please register.
        <v-divider></v-divider>
        <v-btn>
            <router-link to="Login">Log In</router-link>
        </v-btn>
        <v-btn>
            <router-link to="Register">Register</router-link>
        </v-btn>
    </v-alert>
</template>

<script>
export default {
    name: 'LoginInfo',
}
</script>
