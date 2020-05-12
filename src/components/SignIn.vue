<template>
    <v-app id="inspire">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12">
                            <v-toolbar color="primary darken-2" flat>
                                <v-toolbar-title>{{ 'InsertMsg' }}</v-toolbar-title>
                            </v-toolbar>
                            <v-form ref="form" @submit.prevent="handleSubmit">
                                <v-card-text>
                                    <v-text-field
                                        v-model="username"
                                        label="Username"
                                        name="username"
                                        prepend-icon="person"
                                        class="form-control"
                                        :class="{ 'is-invalid': submitted && !username }"
                                        type="text"
                                    />
                                    <div v-show="submitted && !username" class="invalid-feedback">
                                        Username is required
                                    </div>
                                    <v-text-field
                                        v-model="password"
                                        id="password"
                                        label="Password"
                                        name="password"
                                        prepend-icon="lock"
                                        class="form-control"
                                        :class="{ 'is-invalid': submitted && !password }"
                                        type="password"
                                    />
                                    <div v-show="submitted && !password" class="invalid-feedback">
                                        Password is required
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <router-link to="/register" class="btn btn-link">Register</router-link>
                                    <v-spacer />
                                    <img
                                        v-show="status.loggingIn"
                                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                                    />
                                    <v-btn color="primary darken-2" @click="handleSubmit" :disabled="status.loggingIn"
                                        >Login</v-btn
                                    >
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'SignIn',
    data() {
        return {
            username: '',
            password: '',
            login_info: 'Users can retrieve additional data files',
            submitted: false,
            loading: false,
            error: '',
        }
    },
    computed: {
        ...mapState('account', ['status']),
    },
    created() {
        this.logout()
    },
    methods: {
        ...mapActions({
            login: 'account/login',
            logout: 'account/logout',
        }),
        handleSubmit(e) {
            e.preventDefault()
            this.submitted = true
            const { username, password } = this

            if (username && password) {
                this.login({ username, password })
            }
        },
    },
}
</script>

<!--<style scoped>-->
<!--h1 {-->
<!--  color: #294993;-->
<!--}-->
<!--</style>-->
