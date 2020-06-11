<template>
    <div>
        <input v-model="searchInput" placeholder="Search" /> <br />
        <v-btn @click="handleSubmit" icon large target="_blank">
            <v-icon left>mdi-cloud-search</v-icon>
        </v-btn>
        <v-row>
            <h2>Files</h2>
            <v-col class="text-lg-right">
                <v-btn @click="handleBatchDownload()" right class="ma-2" tile outlined target="_blank">
                    <v-icon left>mdi-download</v-icon>Download All
                </v-btn>
            </v-col>
        </v-row>
        <v-container>
            <v-expansion-panels v-for="data in getQueried" :key="data.id" elevation="5" outlined>
                <v-expansion-panel>
                    <v-row></v-row>
                    <v-expansion-panel-header>
                        {{ data.file_standard_name }}
                        <v-btn class="text-lg-right" @click="handleDownload(data.file)" icon target="_blank">
                            <v-icon>mdi-download</v-icon>
                        </v-btn>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-list v-for="(item, key) in getListObjects(data)" :key="key" dense>
                            <v-list-item>
                                <v-list-item-title v-text="key"></v-list-item-title>
                                <v-list-item-subtitle v-text="item"></v-list-item-subtitle>
                            </v-list-item>
                        </v-list>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
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
            resetQueryState: 'queries/resetQueryState',
        }),
        // eslint-disable-next-line no-unused-vars
        handleSubmit() {
            this.show = false
            this.resetQueryState()
            let search = this.searchInput
            this.query({ search }) // this needs to be parsed as dict. else it defaults to 'undefined'
        },
        handleDownload(file) {
            this.download({ file })
        },
        handleBatchDownload() {
            let files = this.getQueried
            files.forEach(this.download)
        },
        getListObjects(data) {
            let newDict = Object.assign({}, data)
            delete newDict.id
            delete newDict.file
            delete newDict.download_count
            delete newDict.is_invalid
            delete newDict.is_old
            delete newDict.has_warnings
            delete newDict.has_errors

            return newDict
        },
    },
    mounted() {
        this.handleSubmit()
    },
    data() {
        return {
            searchInput: '',
            show: false,
        }
    },
}
</script>
