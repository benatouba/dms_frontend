<template>
    <!--    TODO: add button to disable login info box-->
    <v-alert class="d-flex" icon="mdi-account" border="bottom" colored-border text type="info" elevation="2">
        <p>{{ $t('login_info.text') }}</p>
        <v-divider></v-divider>
        <v-btn>
            <router-link to="login">{{ $t('buttons.login') }}</router-link>
        </v-btn>
        <v-btn>
            <router-link to="register">{{ $t('buttons.register') }}</router-link>
        </v-btn>
    </v-alert>
</template>

<script>
export default {
    name: 'LoginInfo',
}
</script>
