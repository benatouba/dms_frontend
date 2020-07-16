<template>
    <v-expansion-panels elevation="5" outlined hover>
        <v-expansion-panel>
            <v-expansion-panel-header
                    :class="`${colors[file.result.status]}`"
            >
                <v-row>
                    <v-col cols="10">
                        <strong class="my-3"> {{ file.name }} </strong>
                        <span class="my-3 text--secondary"> {{ file.type }} </span>
                    </v-col>
                    <v-col cols="2">
                        <span class="text--secondary align-end">
                            {{ file.uploaded? 'uploaded': 'not uploaded'}}
                        </span>
                    </v-col>
                </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-list class="justify-center" dense>
                    <v-list-item v-show="arrayify(value)" v-for="(value, key) in file.result" :key="key">
                        <v-list-item-title>{{ key }}</v-list-item-title>
                            <v-col align="center" justify="space-around">
                                <v-list-item-subtitle v-for="msg in arrayify(value)" :key="msg">
                                    {{ msg }}
                                </v-list-item-subtitle>
                            </v-col>
                    </v-list-item>
                </v-list>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
export default {
    name: 'FileCard',
    props: {
        file: {
            type: Object,
            required: true,
        }
    },
    methods: {
        arrayify(data) {
            if (Array.isArray(data)) {
                return data
            } else {
                return [data]
            }
        },
    },
    data() {
        return {
            colors: ['info', 'success', 'warnings', 'errors', 'fatal']
        }
    },
}
</script>

<style scoped lang="scss">
.success {
    border-left: 4px solid #ffaa2c;
}
.warnings {
    border-left: 4px solid #ffaa2c;
}
.errors {
    border-left: 4px solid #f83e70;
    text-align: left;
    justify-self: left;
}
.fatal {
    border-left: 4px solid #000000;
    text-align: left;
    justify-self: left;
}
</style>
