<template>
    <v-container>
        <v-expansion-panels v-for="data in files" :key="data.file.name" elevation="5" outlined>
            <v-expansion-panel>
                <v-row align="center" no-gutters>
                <v-expansion-panel-header :class="`filename${data.resp.status}`">
                        <strong>{{ data.file.name }}</strong>
                        <span color="#000000">{{ data.uploaded? 'uploaded': 'not uploaded'}}</span>
                        <v-btn
                                v-if="data.resp.status === 2"
                                @click="uploadWithWarnings(data.file)"
                                text
                                left
                                ripple
                                class="ma-2 primary--text"
                                outlined
                                tile
                                target="_blank"
                        >
                            {{ $t('buttons.upload_with_warnings') }}
                        </v-btn>

                </v-expansion-panel-header>
                </v-row>
                <v-expansion-panel-content>
                    <v-list
                            v-for="(item, key) of data.resp"
                            :key="key"
                            class="justify-center"
                            dense
                    >
                        <v-row no-gutters align="center">
                            <v-col cols="12" justify="start" dense>
                                <v-list-item
                                        v-if="Array.isArray(item) && item.length"
                                        :class="`${key}`"
                                >
                                    <v-list
                                            dense
                                    >
                                        <v-list-item
                                                v-for="msg of item"
                                                :key="msg"
                                                dense>
                                            <div v-if="Array.isArray(msg)">
                                                <v-list-item-subtitle
                                                        v-for="(value, key) in msg"
                                                        :key="key">
                                                    {{ value }}
                                                </v-list-item-subtitle>
                                            </div>
                                            <div v-else>
                                                <v-list-item-subtitle >
                                                    {{ msg }}
                                                </v-list-item-subtitle>
                                            </div>
                                        </v-list-item>
                                    </v-list>
                                </v-list-item>
                            </v-col>
                        </v-row>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list v-for="(value, key) in data.resp.result" :key="key" dense>
                        <v-list-item v-for="(item, id) in value" :key="id">
                            <v-list-item-title>{{ key }}</v-list-item-title>
                            <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
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
        uploadWithWarnings(file) {
            this.$store.dispatch('upload/uploadFiles', {
                file,
                ignore_warnings: true,
                ignore_errors: false,
                }
            )
        }
    }
}
</script>

<style lang="scss">
.filename1 {
    border-left: 4px solid #3cd1c2;
}
.filename2 {
    border-left: 4px solid #ffaa2c;
    color: #ffaa2c;
}
.filename3 {
    border-left: 4px solid #f83e70;
    color: #f83e70;
}
.filename4 {
    border-left: 4px solid #f83e70;
    color: #f83e70;
}
.warnings {
    border-left: 4px solid #ffaa2c;
    color: #ffaa2c;
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
