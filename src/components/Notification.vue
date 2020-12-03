<template>
  <div>
    <v-banner
        app
        v-for="info in infos"
        :key="info.id"
        :color="info.type"
        rounded
        sticky
        :elevation="5"
        style="z-index: 10;"
    >
        <v-row align="center">
            <v-col cols="12">
                <v-btn icon @click="clear(info.id)" rounded>
                    <v-icon>
                        mdi-close-circle
                    </v-icon>
                </v-btn>
                <span>
                    {{ info.message }}
                </span>
            </v-col>
        </v-row>
      <slot></slot>
    </v-banner>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { isObj } from '../helpers/treebuilder'

export default {
    name: 'Notification',
    computed: {
        ...mapState({
            infos: state => state.alerts.infos,
        }),
    },
    methods: {
        ...mapActions({
            clearAll: 'alerts/clear',
            clear: 'alerts/removeInfo',
        }),
        reformatAlert(alert) {
            if (isObj(alert)) {
                return Object.values(alert)[0]
            } else {
                return alert
            }
        },
    },
    watch: {
        $route() {
            // clear alert on location change
            this.clearAll()
        },
    },
}
</script>
