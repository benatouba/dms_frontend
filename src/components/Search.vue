<template>
    <div>
        <v-container class="text--primary">
          <strong>{{ meta.institution }}</strong>
            <v-card>
                <v-card-title>
                    {{ $t('buttons.input') }}
                </v-card-title>
                <v-input
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
                                label="Institution"
                                color="primary"
                                @change="handleSubmit"
                            ></v-autocomplete>
                            <v-icon
                                v-show="searchInput.acronym"
                                @click="
                                    searchInput.acronym = ''
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
                                label="Site"
                                color="primary"
                                @change="handleSubmit"
                            ></v-autocomplete>
                            <v-icon
                                v-show="searchInput.site__id"
                                @click="
                                    searchInput.site__id = ''
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
                                v-model="searchInput.variables__id"
                                :items="meta('variable')"
                                item-text="long_name"
                                item-value="id"
                                label="Variable"
                                color="primary"
                                @change="handleSubmit"
                            ></v-autocomplete>
                            <v-icon
                                v-show="searchInput.variables__id"
                                @click="
                                    searchInput.variables__id = ''
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
                                false-value="false"
                                true-value="null"
                            ></v-switch>
                            <v-switch
                                @change="handleSubmit"
                                color="primary"
                                v-model="searchInput.is_old"
                                :label="$t('buttons.show_old')"
                                false-value="false"
                                true-value="null"
                            ></v-switch>
                            <v-switch
                                v-if="account.token"
                                @change="handleSubmit"
                                color="primary"
                                v-model="searchInput.uploader"
                                :label="$t('buttons.uploaded_by_me')"
                                :true-value="account.id"
                                false-value=""
                            ></v-switch>
                            <v-switch
                                v-if="account.token"
                                @change="handleSubmit"
                                color="primary"
                                v-model="searchInput.acronym"
                                :label="$t('buttons.uploaded_by_institution')"
                                :true-value="account.institutions.join()"
                                false-value=""
                            ></v-switch>
                        </v-row>
                        <v-row>
                            <v-btn @click="handleSubmit" depressed x-large>
                                <v-icon left color="primary">mdi-cloud-search</v-icon>
                                {{ $t('buttons.search') }}
                            </v-btn>
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
                        @input="handleSubmit"
                        v-model="page"
                        v-if="getPageCount > 1"
                        :length="getPageCount"
                        :total-visible="7"
                        prev-icon="mdi-menu-left"
                        next-icon="mdi-menu-right"
                    ></v-pagination>
                </v-col>
                <v-col cols="12" sm="4" md="3" lg="2">
                    <v-select
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
                v-for="data in queriedFiles"
                :key="data.id"
                elevation="5"
                outlined
            >
                <v-expansion-panel dense>
                    <v-row cols="12" class="d-flex" justify="center" align="center">
                        <v-col md="7">
                            <v-expansion-panel-header :class="colorStyle(data)">
                                {{ data.file_standard_name }}
                            </v-expansion-panel-header>
                        </v-col>
                        <v-col justify="center">
                            <span v-if="!!data.is_old" style="font-size: 85%;">
                                {{ $t('search.is_old') }}
                            </span>
                            <span v-if="!!data.has_warnings" style="font-size: 85%;">
                                {{ $t('search.has_warnings') }}
                            </span>
                            <span v-if="!!data.is_invalid" style="font-size: 85%;">
                                {{ $t('search.is_invalid') }}
                            </span>
                            <span v-if="!!data.has_errors" style="font-size: 85%;">
                                {{ $t('search.has_errors') }}
                            </span>
                        </v-col>
                        <v-col md="1">
                            <v-btn @click="handleDownload(data)" depressed small icon>
                                <v-icon color="primary">mdi-download</v-icon>
                            </v-btn>
                        </v-col>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-col md="1" v-bind="attrs" v-on="on">
                                    <v-btn
                                        v-if="account.token"
                                        :disabled="!!data.download_count && (!group(data.institution) || !account.is_superuser)"
                                        @click="handleDelete(data)"
                                        icon
                                        depressed
                                        small
                                    >
                                        <v-icon color="primary">mdi-delete</v-icon>
                                    </v-btn>
                                </v-col>
                            </template>
                            <span>{{ $t('buttons.delete_tooltip')}}</span>
                        </v-tooltip>
                        <v-col md="12">
                            <v-expansion-panel-content>
                                <v-dialog
                                    v-if="!data.is_invalid && (!!group(data.institution) || account.is_superuser)"
                                    v-model="dialog"
                                    persistent
                                    max-width="290"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="warning" v-bind="attrs" v-on="on">
                                            {{ $t('buttons.mark_invalid') }}
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title class="headline">{{ $t('buttons.mark_invalid') }}</v-card-title>
                                        <v-card-text>{{ $t('search.mark_invalid_warning') }}</v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" text @click="dialog = false">
                                                {{ $t('buttons.cancel') }}
                                            </v-btn>
                                            <v-btn
                                                color="warning"
                                                text
                                                @click="
                                                    setInvalid(data)
                                                    dialog = false
                                                    handleSubmit
                                                "
                                            >
                                                {{ $t('buttons.confirm') }}
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
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
                        @input="handleSubmit"
                        v-model="page"
                        v-if="getPageCount > 1"
                        :length="getPageCount"
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
import {mapActions, mapGetters, mapState} from 'vuex'
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
            itemCount: state => state.queries.count,
        }),
        ...mapGetters({
          group: 'account/group',
          meta: 'queries/meta'
        }),
        getPageCount() {
            return Math.ceil(this.itemCount / this.pageLength)
        },
    },
    methods: {
        ...mapActions({
            search: 'queries/search',
            download: 'queries/download',
            delete: 'queries/delete',
            setInvalid: 'queries/setInvalid',
            resetQueryState: 'queries/resetQueryState',
            fetchMeta: 'queries/fetchMeta',
        }),
        handleSubmit: function() {
            this.show = false
            this.searchInput.offset = (this.page - 1) * this.pageLength
            this.searchInput.limit = this.pageLength
            if (this.queriedFiles) {
                this.resetQueryState()
            }
            this.search(this.searchInput)
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
            show: false,
            page: 1,
            pageLength: 10,
            pageLengthChoices: [5, 10, 20, 50],
            searchInput: {
                search: '',
                acronym: '',
                site__id: '',
                variables__id: '',
                uploader: '',
                is_invalid: false,
                is_old: false,
                // origin_time: new Date('2020-07-01').toISOString().substr(0, 10)
            },
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
