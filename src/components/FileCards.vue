<template>
    <v-container>
        <v-row dense>
            <v-col v-for="data in allFiles.files" :key="data.id" class="d-flex">
                <v-card elevation="5" outlined tile>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title class="headline">{{ data.result.file_standard_name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ data.result.institution }}</v-list-item-subtitle>
                            <v-list-item-icon v-if="data.status === 1">
                                <v-icon round color="success">mdi-check</v-icon>
                                <p class="success--text">Successfull!</p>
                            </v-list-item-icon>
                            <v-list-item-icon v-if="data.status === 2">
                                <v-icon round color="warning">mdi-warning</v-icon>
                                <p v-for="warning in data.warnings" :key="warning" class="warning--text">
                                    {{ warning }}
                                </p>
                            </v-list-item-icon>
                            <v-list-item-icon v-if="data.status === 3">
                                <v-icon round color="error">mdi-clear</v-icon>
                                <p v-for="warning in data.warnings" :key="warning" class="warning--text">
                                    {{ warning }}
                                </p>
                                <p v-for="error in data.errors" :key="error" class="error--text">
                                    {{ error }}
                                </p>
                                <p v-for="fatal in data.fatal" :key="fatal" class="error--text">
                                    {{ fatal }}
                                </p>
                            </v-list-item-icon>
                        </v-list-item-content>
                        <v-card-actions>
                            <v-btn v-if="data.status !== 1" icon large target="_blank">
                                <v-icon>mdi-upload</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="show = !show">
                                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-list-item>

                    <v-divider></v-divider>
                    <v-expand-transition>
                        <div v-show="show">
                            <v-list v-for="(item, key) in data.result" :key="key" height="4" dense>
                                <v-list-item>
                                    <v-list-item-title v-text="key"></v-list-item-title>
                                    <v-list-item-subtitle v-text="item"></v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </div>
                    </v-expand-transition>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'FileCards',
    methods: {
        ...mapState({ files: 'files' }),
        ...mapGetters([
            'allFiles',
            'uploadedFiles',
            'notUploadedFiles',
            'successFiles',
            'warningFiles',
            'errorFiles',
            'fatalFiles',
        ]),
    },
    watch: {
        // watch changes here
        files: function(newValue, oldValue) {
            // apply your logic here, e.g. invoke your listener function
            console.log('was: ', oldValue, ' now: ', newValue)
        },
    },
    mounted() {
        let files = this.files
        console.log(files)
    },
    data() {
        return {
            show: false,
        }
    },
}
</script>
