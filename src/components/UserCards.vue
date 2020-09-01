<template>
    <v-container>
        <h3>{{ $t('admin.user_title') }}</h3>
        <em v-if="users.loading">Loading users...</em>
        <v-expansion-panels v-for="user in users.items" :key="user.id" elevation="5" outlined>
            <v-expansion-panel v-if="user.id">
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
                    <v-divider></v-divider>
                    <v-row>
                        <v-col>
                            <v-btn
                                v-if="user.is_active"
                                class="mx-1"
                                @click="
                                    manageUser(user.id, 0)
                                    overlay = true
                                "
                                >
                              {{ $t('admin.admit') }}
                            </v-btn>
                            <v-btn
                                v-if="user.is_active" class="mx-1"
                                @click="manageUser(user.id, 1)"
                            >
                              {{ $t('admin.decline') }}
                            </v-btn>
                            <v-btn
                                color="error"
                                class="mx-1"
                                @click="deleteUser(user.id)"
                            >
                              {{ $t('admin.delete_user') }}
                            </v-btn>
                            <v-overlay class="text-center" absolute :value="overlay" :opacity="0.8">
                              <Notification>
                                <v-btn
                                    color="primary white--text v-size--large"
                                    @click="overlay = false"
                                >
                                    {{ $t('buttons.ok') }}
                                </v-btn>
                              </Notification>
                            </v-overlay>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>
// TODO: approve/decline group change button
// TODO: delete user button
// TODO: add user search
import { mapState, mapActions } from 'vuex'
import Notification from './Notification'
export default {
    name: 'UserCards',
    components: { Notification },
    computed: {
        ...mapState({
            users: state => state.users,
        }),
    },
    created() {
        this.list('')
    },
    methods: {
        ...mapActions('users', {
            list: 'list',
            deleteUser: 'delete',
            manageUser: 'manage',
        }),
    },
    data() {
        return {
            overlay: false,
        }
    },
}
</script>
