<template>
    <div>
        <v-container class="text--primary">
            <strong>{{ meta.institution }}</strong>
            <v-card>
                <v-card-title style="margin: 0px">
                    {{ $t('buttons.input') }}
                </v-card-title>
                <input
                    v-model="options.search"
                    @keypress.enter="handleSubmit"
                    :placeholder="$t('search.placeholder')"
                    class="input text--secondary my-2"
                />
                <br />
                <v-card-title style="font-size: 15px; margin: 0px">
                    {{ $t('search.filter_options') }}
                </v-card-title>
                <v-btn-toggle v-model="filetype" tile color="secondary" group>
                    <v-btn v-for="item in filetypes" :key="item.value" :value="item.value">
                        {{ item.text }}
                    </v-btn>
                </v-btn-toggle>
                <v-card-text>
                    <v-row no-gutters>
                        <v-col>
                            <v-autocomplete
                                dense
                                v-model="options.acronym"
                                :items="meta('institution')"
                                item-text="ge_title"
                                item-value="acronym"
                                :label="$tc('buttons.institution')"
                                color="primary"
                                clearable
                                @change="handleSubmit"
                            ></v-autocomplete>
                            <v-autocomplete
                                v-if="filetype === 'file'"
                                v-model="options.site__id"
                                :items="meta('site')"
                                item-text="site"
                                item-value="id"
                                :label="$tc('buttons.site')"
                                color="primary"
                                @change="handleSubmit"
                                dense
                                clearable
                            ></v-autocomplete>
                            <v-autocomplete
                                v-if="filetype === 'file'"
                                v-model="options.variables__variable"
                                :items="meta('variable')"
                                item-text="long_name"
                                item-value="variable"
                                :label="$tc('buttons.variable')"
                                color="primary"
                                @change="handleSubmit"
                                dense
                                clearable
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions style="margin-top: -25px">
                    <v-row justify="center" no-gutters>
                        <v-switch
                            @change="handleSubmit"
                            color="primary"
                            v-model="options.is_invalid"
                            :label="$t('buttons.show_invalid')"
                            :false-value="false"
                            true-value="null"
                        ></v-switch>
                        <v-switch
                            v-if="filetype !== 'palmjob'"
                            @change="handleSubmit"
                            color="primary"
                            v-model="options.is_old"
                            :label="$t('buttons.show_old')"
                            :false-value="false"
                            true-value="null"
                        ></v-switch>
                        <v-switch
                            v-if="account.token"
                            @change="handleSubmit"
                            color="primary"
                            v-model="options.uploader"
                            :label="$t('buttons.uploaded_by_me')"
                            :true-value="account.id"
                            :false-value="null"
                        ></v-switch>
                        <v-switch
                            v-if="account.token"
                            @change="handleSubmit"
                            color="primary"
                            v-model="options.acronym"
                            :label="$t('buttons.uploaded_by_institution')"
                            :true-value="account.institutions.join()"
                            :false-value="null"
                        ></v-switch>
                    </v-row>
                </v-card-actions>
                <v-card-actions>
                    <v-btn @click="handleSubmit" color="primary" large>
                        <v-icon left dark>mdi-cloud-search</v-icon>
                        {{ $t('buttons.search') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
// import DatePicker from "./DatePicker";
export default {
    name: 'Search',
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
        handleSubmit() {
            if (this.queriedFiles) {
                this.resetQueryState()
            }
            this.options.offset = 0
            this.search({ options: this.options, filetype: this.filetype })
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
    },
    mounted() {
        this.fetchMeta('institution')
        this.fetchMeta('site')
        this.fetchMeta('variable')
        // this.handleSubmit()
    },
    watch: {
        filetype: function() {
            this.handleSubmit()
        },
    },
    data() {
        return {
            choices: {
                institution: [],
                site: [],
                variable: [],
            },
            options: {
                search: null,
                uploader: null,
                is_invalid: false,
                is_old: false,
                offset: 0,
                acronym: null,
                site__id: null,
                variables__variable: null,
                job__job_name: null,
                domain_name: null,
                type: null,
            },
            filetypes: [
                { text: '[UC]² Observations', value: 'file' },
                { text: 'PALM-4U Job', value: 'palmjob' },
            ],
            filetype: 'file',
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
