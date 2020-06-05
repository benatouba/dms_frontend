<template>
    <div>
        <input v-model="searchInput" placeholder="Search" /> <br />
        <v-btn @click="handleSubmit(searchInput)" icon large target="_blank">
            <v-icon>mdi-cloud-search</v-icon>
        </v-btn>
        <h3>Files</h3>
        <v-btn @click="handleBatchDownload()" icon large target="_blank">
            <v-icon>mdi-download</v-icon>
        </v-btn>
        <v-container>
            <v-row dense>
                <v-col v-for="data in getQueried" :key="data.id" cols="12" class="d-flex">
                    <v-card max-width="800" elevation="5" outlined tile class="align-self-items">
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="headline">{{ data.file_standard_name }}</v-list-item-title>
                                <v-list-item-subtitle>{{ data.institution }}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-card-actions>
                                <v-btn @click="handleDownload(data.file)" icon large target="_blank">
                                    <v-icon>mdi-download</v-icon>
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
                                <v-list v-for="(item, key) in data" :key="key" height="4" dense>
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
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    name: 'query',
    computed: {
        ...mapState('queries', ['result']),
        ...mapGetters({
            allFiles: 'queries/queriedFiles',
        }),
        getQueried() {
            return this.allFiles
        },
    },
    methods: {
        ...mapActions({
            query: 'queries/query',
            download: 'queries/download',
        }),
        // eslint-disable-next-line no-unused-vars
        handleSubmit() {
            this.show = false
            this.query(this.searchInput)
        },
        handleDownload(file) {
            this.download({ file })
        },
        handleBatchDownload() {
            let files = this.getQueried
            files.forEach(this.download)
        },
    },
    data() {
        return {
            searchInput: '',
            show: false,
        }
    },
}
</script>
