<template>
    <v-container>
        <v-expansion-panels v-for="data in files" :key="data.result.name" elevation="5" outlined>
            <v-expansion-panel>
                <v-expansion-panel-header :class="`filename${data.status}`">
                    {{ data.result.file_standard_name }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-list v-for="(item, key) in createMsgDict(data)" :key="key" class="justify-center" dense>
                        <v-list-item v-show="item !== []" :class="`${key}`">
                            <v-list-item-title v-text="key"></v-list-item-title>
                            <v-list v-for="msg in item" :key="msg">
                                <v-col align="center" justify="space-around">
                                    <v-list-item>
                                        <v-list-item-subtitle v-text="msg"> </v-list-item-subtitle>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                </v-col>
                            </v-list>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list v-for="(item, key) in data.result" :key="key" dense>
                        <v-list-item>
                            <v-list-item-title v-text="key"></v-list-item-title>
                            <v-list-item-subtitle v-text="item"></v-list-item-subtitle>
                        </v-list-item>
                    </v-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'FileCards',
    computed: {
        ...mapState({
            files: state => state.upload.files,
        }),
    },
    methods: {
        createMsgDict(data) {
            let newDict = {
                fatal: data.fatal,
                errors: data.errors,
                warnings: data.warnings,
            }
            return newDict
        },
    },
}
</script>

<style lang="scss">
.filename1 {
    border-left: 4px solid #3cd1c2;
}
.filename2 {
    border-left: 4px solid #ffaa2c;
}
.filename3 {
    border-left: 4px solid #f83e70;
}
.filename4 {
    border-left: 4px solid #f83e70;
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
