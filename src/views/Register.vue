<template>
    <div class="register">
        <v-container class="mx-4">
            <img alt="UC2 logo" src="@/assets/logo.png" />
            <SignUp />
        </v-container>
    </div>
</template>

<script>
// @ is an alias to /src
import SignUp from '../components/SignUp.vue'

export default {
    name: 'Register',
    components: {
        SignUp,
    },
}
</script>
