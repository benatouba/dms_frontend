<template>
    <div>
        <v-container class="text--primary">
            <strong>{{ meta.institution }}</strong>
            <v-card>
                <v-card-title>
                    {{ $t('buttons.input') }}
                </v-card-title>
                <input
                    v-model="searchInput.search"
                    @keypress.enter="handleSubmit"
                    :placeholder="$t('search.placeholder')"
                    class="input text--secondary my-2"
                />
                <br />
                <v-card-title>
                    {{ $t('search.filter_options') }}
                </v-card-title>
                <v-card-actions>
                    <v-col cols="12">
                        <v-row>
                            <v-autocomplete
                                v-model="searchInput.acronym"
                                :items="meta('institution')"
                                item-text="ge_title"
                                item-value="acronym"
                                :label="$t('buttons.institution')"
                                color="primary"
                                @change="handleSubmit"
                            ></v-autocomplete>
                            <v-icon
                                v-show="searchInput.acronym"
                                @click="
                                    searchInput.acronym = null
                                    handleSubmit()
                                "
                                small
                                flat
                                icon
                                depressed
                                >mdi-close-circle</v-icon
                            >
                        </v-row>
                        <v-row>
                            <v-autocomplete
                                v-model="searchInput.site__id"
                                :items="meta('site')"
                                item-text="site"
                                item-value="id"
                                :label="$t('buttons.site')"
                                color="primary"
                                @change="handleSubmit"
                            ></v-autocomplete>
                            <v-icon
                                v-show="searchInput.site__id"
                                @click="
                                    searchInput.site__id = null
                                    handleSubmit()
                                "
                                small
                                flat
                                icon
                                depressed
                                >mdi-close-circle</v-icon
                            >
                        </v-row>
                        <v-row>
                            <v-autocomplete
                                v-model="searchInput.variables__variable"
                                :items="meta('variable')"
                                item-text="long_name"
                                item-value="variable"
                                :label="$t('buttons.variable')"
                                color="primary"
                                @change="handleSubmit"
                            ></v-autocomplete>
                            <v-icon
                                v-show="searchInput.variables__variable"
                                @click="
                                    searchInput.variables__variable = null
                                    handleSubmit()
                                "
                                small
                                flat
                                icon
                                depressed
                                >mdi-close-circle</v-icon
                            >
                        </v-row>
                        <v-row justify="center">
                            <v-switch
                                @change="handleSubmit"
                                color="primary"
                                v-model="searchInput.is_invalid"
                                :label="$t('buttons.show_invalid')"
                                :false-value="false"
                                true-value="null"
                            ></v-switch>
                            <v-switch
                                @change="handleSubmit"
                                color="primary"
                                v-model="searchInput.is_old"
                                :label="$t('buttons.show_old')"
                                :false-value="false"
                                true-value="null"
                            ></v-switch>
                            <v-switch
                                v-if="account.token"
                                @change="handleSubmit"
                                color="primary"
                                v-model="searchInput.uploader"
                                :label="$t('buttons.uploaded_by_me')"
                                :true-value="account.id"
                                :false-value="null"
                            ></v-switch>
                            <v-switch
                                v-if="account.token"
                                @change="handleSubmit"
                                color="primary"
                                v-model="searchInput.acronym"
                                :label="$t('buttons.uploaded_by_institution')"
                                :true-value="account.institutions.join()"
                                :false-value="null"
                            ></v-switch>
                        </v-row>
                        <v-row>
                            <v-btn @click="handleSubmit" depressed x-large>
                                <v-icon left color="primary">mdi-cloud-search</v-icon>
                                {{ $t('buttons.search') }}
                            </v-btn>
                        </v-row>
                    </v-col>
                </v-card-actions>
            </v-card>
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
            account: state => state.account,
            queriedFiles: state => state.queries.result,
            querying: state => state.queries.querying,
            downloading: state => state.queries.downloading,
            itemCount: state => state.queries.count,
        }),
        ...mapGetters({
            group: 'account/group',
            meta: 'queries/meta',
        }),
        getPageCount() {
            return Math.ceil(this.itemCount / this.pageLength)
        },
    },
    methods: {
        ...mapActions({
            search: 'queries/search',
            download: 'queries/download',
            downloadAll: 'queries/downloadAll',
            delete: 'queries/delete',
            setInvalid: 'queries/setInvalid',
            resetQueryState: 'queries/resetQueryState',
            fetchMeta: 'queries/fetchMeta',
        }),
        handleSubmit: function() {
            this.searchInput.offset = (this.page - 1) * this.pageLength
            this.searchInput.limit = this.pageLength
            if (this.queriedFiles) {
                this.resetQueryState()
            }
            let searchParams = Object.assign({}, this.searchInput)
            Object.keys(searchParams).forEach(key => searchParams[key] == null && delete searchParams[key])
            this.search(searchParams)
        },
        handleDownload(file) {
            this.download({ file })
        },
        handleBatchDownload() {
            let ids = []
            this.queriedFiles.forEach(obj => ids.push(obj.id))
            this.downloadAll({ ids })
        },
        handleDelete(file) {
            this.delete(file)
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
        colorStyle(item) {
            let color = item.has_warnings ? 'warning' : 'secondary'
            if (item.is_old) {
                color = 'brown'
            } else if (item.has_errors) {
                color = 'error'
            } else if (item.is_invalid) {
                color = 'error'
            }
            return color + '--text'
        },
    },
    created() {
        this.handleSubmit()
        this.fetchMeta('institution')
        this.fetchMeta('site')
        this.fetchMeta('variable')
    },
    mounted() {
        this.pageLength = 10
        this.page = 1
    },
    data() {
        if (!this.page) {
            this.page = 1
            this.pageLength = 10
        }
        return {
            choices: {
                institution: [],
                site: [],
                variable: [],
            },
            dialog: false,
            page: 1,
            pageLength: 10,
            pageLengthChoices: [5, 10, 20, 50],
            searchInput: {
                search: null,
                acronym: null,
                site__id: null,
                variables__variable: null,
                uploader: null,
                is_invalid: false,
                is_old: false,
                // origin_time: new Date('2020-07-01').toISOString().substr(0, 10)
            },
            loading: false,
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
