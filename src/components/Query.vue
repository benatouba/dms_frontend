<template>
    <div>
        <h1>{{ $t('search.title') }}</h1>
        <input
                v-model="searchInput.search"
                @keypress.enter="handleSubmit"
                :placeholder="$t('search.placeholder')"
                class="input text--secondary my-2" />
        <br />
        <v-btn @click="handleSubmit" icon x-large target="_blank">
            <v-icon left color="primary">mdi-cloud-search</v-icon>
        </v-btn>
        <v-container class="text--primary">
            <v-card>
                <v-card-title>
                    {{ $t('search.filter_options')}}
                </v-card-title>
                <v-card-actions>
                    <v-col cols="12">
                        <v-row>
                        <v-autocomplete
                            v-model="searchInput.institution"
                            :items="choices.institution"
                            item-text="ge_title"
                            item-value="acronym"
                            label="Institution"
                            color="primary"
                            @change="handleSubmit; getChoices(choices.site, 'site', searchInput.institution)"
                        ></v-autocomplete>
                        <v-icon
                            v-show="searchInput.institution"
                            @click="searchInput.institution = ''"
                            small
                            flat
                            icon
                            depressed
                        >mdi-close-circle</v-icon>
                        </v-row>
                        <v-row>
                        <v-autocomplete
                            v-model="searchInput.site__id"
                            :items="choices.site"
                            item-text="site"
                            item-value="id"
                            label="Site"
                            color="primary"
                            @change="handleSubmit"
                        ></v-autocomplete>
                        <v-icon
                                v-show="searchInput.site__id"
                                @click="searchInput.site__id = ''"
                                small
                                flat
                                icon
                                depressed
                        >mdi-close-circle</v-icon>
                        </v-row>
                        <v-row>
                        <v-autocomplete
                                v-model="searchInput.variables__id"
                                :items="choices.variable"
                                item-text="long_name"
                                item-value="id"
                                label="Variable"
                                color="primary"
                                @change="handleSubmit"
                        ></v-autocomplete>
                        <v-icon
                                v-show="searchInput.variables__id"
                                @click="searchInput.variables__id = ''"
                                small
                                flat
                                icon
                                depressed
                        >mdi-close-circle</v-icon>
                        </v-row>
                        <v-row justify="center">
                            <v-switch @change="handleSubmit" color="primary" v-model="searchInput.is_invalid" label="Show invalid" value="1" input-value="false"></v-switch>
                            <v-switch @change="handleSubmit" color="primary" v-model="searchInput.is_old" label="Show old" value="1" input-value="false"></v-switch>
                            <v-switch @change="handleSubmit" color="primary" v-model="searchInput.uploader" label="Uploaded by me" :value="user"></v-switch>
                        </v-row>
                        <!--<v-row justify="center">
                            <v-col cols="4">
                                <date-picker
                                        :date="new Date('2020-07-01').toISOString().substr(0, 10)"
                                        v-model="searchInput.uploader"
                                >

                                </date-picker>
                            </v-col>
                            <v-col cols="4">
                                <date-picker
                                        :date="new Date().toISOString().substr(0, 10)"
                                        v-model="searchInput.uploader"
                                ></date-picker>
                            </v-col>
                        </v-row>-->
                    </v-col>
                </v-card-actions>
            </v-card>
        </v-container>
        <v-divider class="my-3"></v-divider>
        <v-row>
            <h2 class="mx-3">{{ $t('search.file_title') }}</h2>
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
                    {{ $t('search.download_all') }}
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
                            v-if="getPageCount > 1"
                            v-model="pageLength"
                            :items="pageLengthChoices"
                            :label="$t('search.items_per_page')"
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
                    <v-row cols="12" class="d-flex" justify="center">
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
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-col class="d-flex my-3 justify-center"
                                       md="1"
                                       v-bind="attrs"
                                       v-on="on">
                                    <v-btn
                                            v-if="isLoggedIn"
                                            :disabled="data.download_count || data.uploader !== accounts.user"
                                            @click="handleDelete(data)"
                                            icon
                                            depressed
                                            small
                                            absolute
                                    >
                                        <v-icon color="primary">mdi-delete</v-icon>
                                    </v-btn>
                                </v-col>
                            </template>
                            <span>Can only be deleted if you are the uploader and file has not been downloaded.</span>
                        </v-tooltip>
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
                        v-if="getPageCount > 1"
                        v-model="pageLength"
                        :items="pageLengthChoices"
                        :label="$t('search.items_per_page')"
                        dense
                        flat
                ></v-select>
            </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
// import DatePicker from "./DatePicker";
export default {
    name: 'search',
    components: {
        // DatePicker,
    },
    computed: {
        ...mapState({
            accounts: state => state.accounts
        }),
        ...mapGetters({
            queriedFiles: 'queries/queriedFiles',
            isLoggedIn: 'accounts/isLoggedIn',
        }),
        getPageItems() {
            return this.queriedFiles.slice(this.pageLength*(this.page-1), this.pageLength*(this.page))
        },
        getPageCount() {
            return Math.ceil((this.queriedFiles.length/this.pageLength))
        },
    },
    methods: {
        ...mapActions({
            search: 'queries/search',
            download: 'queries/download',
            delete: 'queries/delete',
            resetQueryState: 'queries/resetQueryState',
        }),
        handleSubmit: function () {
            this.show = false
            //if (this.queriedFiles) {
                this.resetQueryState()
            //}
            this.search(this.searchInput) // this needs to be parsed as dict. else it defaults to 'undefined'
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
        fetchMeta(input) {
            fetch(`${process.env['VUE_APP_API_ENDPOINT']}/data/${input}`)
                .then(resp => resp.json())
                .then(data => {
                    this.choices[input] = data
                })
        },
        getChoices(input, name, choice) { // extract choices for filtering from respective objects
            let output = []
            input.forEach(key => output.push(key[choice]))
            this.choices[name] = output
        },
    },
    mounted() {
        this.handleSubmit()
        this.fetchMeta('institution')
        this.fetchMeta('site')
        this.fetchMeta('variable')
    },
    data() {
        return {
            searchInput: {
                search: '',
                institution: '',
                site__id: '',
                variables__id: '',
                uploader: null,
                is_invalid: false,
                is_old: false,
                // origin_time: new Date('2020-07-01').toISOString().substr(0, 10)
            },
            choices: {
                institution: [],
                site: [],
                variable:[],
            },
            show: false,
            page: 1,
            pageLength: 10,
            pageLengthChoices: [5, 10, 20, 50],
            // FIXME: get from data store for production
            user: localStorage.getItem('user'),
        }
    }
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
