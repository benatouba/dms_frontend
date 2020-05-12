<template>
    <div class="register">
        <img alt="UC2 logo" src="@/assets/logo.png" />
        <SignUp />
    </div>
</template>

<script>
// @ is an alias to /src
import SignUp from '@/components/SignUp.vue'

export default {
    name: 'Register',
    components: {
        SignUp,
    },
}
</script>
