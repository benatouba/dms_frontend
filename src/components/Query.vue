<template>
    <div>
        <h1>{{ $t('query.title') }}</h1>
        <input v-model="searchInput" :placeholder="$t('query.placeholder')" class="input text--secondary my-2" />
        <br />
        <v-btn @click="handleSubmit" icon x-large target="_blank">
            <v-icon left color="primary">mdi-cloud-search</v-icon>
        </v-btn>
        <v-divider class="my-3"></v-divider>
        <v-row>
            <h2 class="mx-3">{{ $t('query.file_title') }}</h2>
            <v-col class="text-lg-right">
                <v-btn
                    text
                    @click="handleBatchDownload()"
                    right
                    class="ma-2 primary--text"
                    tile
                    outlined
                    target="_blank"
                >
                    <v-icon left color="primary">mdi-download</v-icon>
                    {{ $t('query.download_all') }}
                </v-btn>
            </v-col>
        </v-row>
        <v-container class="text--primary">
            <v-row>
                <v-col>
                    <v-pagination
                            v-model="page"
                            v-if="getPageCount > 1"
                            :length=getPageCount
                            :total-visible="7"
                            prev-icon="mdi-menu-left"
                            next-icon="mdi-menu-right"
                    ></v-pagination>
                </v-col>
                <v-col cols="12" sm="4" md="3" lg="2">
                    <v-select
                        v-model="pageLength"
                        :items="pageLengthChoices"
                        :label="$t('query.items_per_page')"
                        dense
                        flat
                        ></v-select>
                </v-col>
            </v-row>
            <v-expansion-panels
                focusable
                accordion
                hover
                v-for="data in getPageItems"
                :key="data.id"
                elevation="5"
                outlined
            >
                <v-expansion-panel dense>
                    <v-row cols="12" class="d-flex">
                        <v-col md="10">
                            <v-expansion-panel-header hide-actions>
                                {{ data.file_standard_name }}
                            </v-expansion-panel-header>
                        </v-col>
                        <v-col class="d-flex my-3 justify-center" md="1">
                            <v-btn @click="handleDownload(data)" depressed small absolute icon>
                                <v-icon color="primary">mdi-download</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col class="d-flex my-3 justify-center" md="1">
                            <v-btn
                                v-if="data.download_count === 0 && isLoggedIn"
                                @click="handleDelete(data)"
                                icon
                                depressed
                                small
                                absolute
                            >
                                <v-icon color="primary">mdi-delete</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col md="12">
                            <v-expansion-panel-content>
                                <v-list v-for="(item, key) in getListObjects(data)" :key="key" dense>
                                    <v-list-item>
                                        <v-list-item-title v-text="key"></v-list-item-title>
                                        <v-list-item-subtitle v-text="item"></v-list-item-subtitle>
                                    </v-list-item>
                                </v-list>
                            </v-expansion-panel-content>
                        </v-col>
                    </v-row>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-row>
            <v-col>
                <v-pagination
                        v-model="page"
                        v-if="getPageCount > 1"
                        :length=getPageCount
                        :total-visible="7"
                        prev-icon="mdi-menu-left"
                        next-icon="mdi-menu-right"
                ></v-pagination>
            </v-col>
            <v-col class="self-center" cols="12" sm="4" md="3" lg="2">
                <v-select
                        v-model="pageLength"
                        :items="pageLengthChoices"
                        :label="$t('query.items_per_page')"
                        dense
                        flat
                ></v-select>
            </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'query',
    computed: {
        // ...mapState({
        //     result: state => state.queries.result
        // }),
        ...mapGetters({
            queriedFiles: 'queries/queriedFiles',
            isLoggedIn: 'accounts/isLoggedIn',
        }),
        getQueried() {
            return this.queriedFiles
        },
        getPageItems() {
            return this.queriedFiles.slice(this.pageLength*(this.page-1), this.pageLength*(this.page))
        },
        getPageCount() {
            return Math.ceil((this.queriedFiles.length/this.pageLength))
        }
    },
    methods: {
        ...mapActions({
            query: 'queries/query',
            download: 'queries/download',
            delete: 'queries/delete',
            resetQueryState: 'queries/resetQueryState',
        }),
        handleSubmit: function () {
            this.show = false
            if (this.queriedFiles) {
                this.resetQueryState()
            }
            let search = this.searchInput
            this.query({ search }) // this needs to be parsed as dict. else it defaults to 'undefined'
        },
        handleDownload(file) {
            this.download({ file })
        },
        handleBatchDownload() {
            let files = this.queriedFiles
            files.forEach(file => this.download({ file }))
        },
        handleDelete(file) {
            this.delete({ file })
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
            page: 1,
            pageLength: 10,
            pageLengthChoices: [5, 10, 20, 50]
        }
    },
}
</script>

<style>
.input {
    outline: 2px solid grey;
    outline-offset: -5px;
    padding: 10px 10px;
    width: 100%;
    height: 100%;
    position: relative;
    justify-self: center;
}
</style>
