<template>
    <v-container>
        <h3>{{ $t('admin.user_title') }}</h3>
        <em v-if="users.loading">Loading users...</em>
        <v-expansion-panels v-for="user in users.items" :key="user.id" elevation="5" outlined>
            <v-expansion-panel>
                <v-expansion-panel-header>
                    {{ user.username }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-list v-for="(item, key) in user" :key="key" class="justify-center" dense>
                        <v-list-item :class="`${key}`">
                            <v-list-item-title v-text="key"></v-list-item-title>
                            <v-list-item-subtitle v-text="item"> </v-list-item-subtitle>
                        </v-list-item>
                    </v-list>
                    <v-btn v-if="user.is_active" @click="manageUser(user.id, 0); overlay=true">Admit</v-btn>
                    <v-btn v-if="user.is_active" @click="manageUser(user.id, 1)">Decline</v-btn>
                    <v-overlay class="text-center" absolute :value="overlay" :opacity=".8">
                        <Notification />
                        <v-btn
                                color="primary white--text v-size--large"
                                @click="overlay = false"
                        >
                            {{ $t('buttons.confirm') }}
                        </v-btn>
                    </v-overlay>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>
    // TODO: approve/decline group change button
    // TODO: delete user button
import { mapState, mapActions } from 'vuex'
export default {
    name: 'UserCards',
    computed: {
        ...mapState({
            users: state => state.users.all
        })
    },
    created () {
        this.list('');
    },
    methods: {
        ...mapActions('users', {
            list: 'list',
            deleteUser: 'delete',
            manageUser: 'manage'
        })
    },
    data() {
        return {
            overlay: false
        }
    }
}
</script>