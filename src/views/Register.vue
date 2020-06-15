<template>
    <div class="register">
        <v-container class="mx-4">
            <img alt="UC2 logo" src="@/assets/logo.png" />
            <Register />
        </v-container>
    </div>
</template>

<script>
import Register from '../components/Login.vue'

export default {
    name: 'Register',
    components: {
        Register,
    },
}
</script>
