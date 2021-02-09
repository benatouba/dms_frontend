<template>
    <v-row align="center">
        <div class="container">
            <form enctype="multipart/form-data" novalidate>
                <h2>{{ $t('headers.palmfile') }}</h2>
                <v-row>
                    <v-col>
                        <v-autocomplete
                            v-model="job.job_name"
                            :items="joblist"
                            item-text="job_name"
                            :label="$t('buttons.palm_job_name')"
                            color="primary"
                            clearable
                            disabled
                        >
                            <template #no-data>
                                <v-list-item @click="showCreatePalmjob = true">
                                    <v-list-item-title>
                                        <strong>{{ $t('upload.create_palmjob') }}{{ job.job_name }}</strong>
                                    </v-list-item-title>
                                </v-list-item>
                            </template>
                            <template #item="{ item }">
                                <v-list-item-avatar class="font-weight-light">
                                    {{ item.licence.substring(-2).toUpperCase() }}
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title class="font-weight-bold">{{ item.job_name }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="1">
                        <v-btn class="mx-5" fab color="primary" @click="showCreatePalmjob = !showCreatePalmjob">
                            <v-icon dark> mdi-plus </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-card v-if="showCreatePalmjob">
                    <v-card-title>
                        {{ $t('upload.create_palmjob') }}
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                v-model="job.job_name"
                                :label="$t('upload.job_name')"
                                name="jobname"
                                type="text"
                                required
                            />
                            <v-autocomplete
                                v-model="job.institution_acronyms"
                                :items="institutions"
                                item-value="acronym"
                                item-text="acronym"
                                :label="$t('upload.job_institutions')"
                                name="institutions"
                                type="Array"
                                multiple
                                required
                            />
                            <v-autocomplete
                                v-model="job.licence"
                                :items="licences"
                                item-value="short_name"
                                item-text="short_name"
                                :label="$t('upload.job_licence')"
                                name="licence"
                                type="string"
                                required
                            />
                            <v-text-field
                                v-model="job.description"
                                :label="$t('upload.job_description')"
                                name="description"
                                type="Array"
                                required
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="createPalmjob(job)">
                            {{ $t('buttons.submit') }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-card class="dropbox primary accent--text text-center" outline block flat hover xs12 md6>
                    <b-confirmation-dialog
                        :title="$t('upload.title')"
                        :body="$t('upload.confirm_palmconfig')"
                        @confirm="handleSubmit"
                    >
                        <div>
                            <input
                                id="palm-droparea-input"
                                type="file"
                                multiple
                                :name="uploadFieldName"
                                :disabled="isSaving"
                                @change.stop.prevent="handleNameCheck($event.target.files)"
                                fileCount="$event.target.files.length"
                                class="input-file"
                            />
                            <p v-if="!isSaving" v-html="$t('upload.droparea')" />
                            <p v-show="isSaving">
                                {{ $tc('upload.uploading1', fileCount, { count: fileCount }) }}
                                {{ $tc('upload.uploading2', fileCount) }}
                                {{ $t('upload.uploading3') }}
                            </p>
                            <v-text-field v-show="isSaving" color="black" loading disabled></v-text-field>
                        </div>
                        <template #content>
                            <v-list>
                                <v-list-item-content>
                                    <v-list-item>
                                        <v-list-item-title>{{ toUpload.job_name }} </v-list-item-title>
                                        <v-list-item-subtitle>{{ $t('upload.upload_to') }}</v-list-item-subtitle>
                                    </v-list-item>
                                </v-list-item-content>
                                <v-divider />
                                <v-list-item-content>
                                    <v-list-item v-for="(file, id) of toUpload.files" :key="id">
                                        <v-list-item-title>{{ file.file_standard_name }}</v-list-item-title>
                                        <v-list-item-subtitle> {{ file.type }} </v-list-item-subtitle>
                                    </v-list-item>
                                </v-list-item-content>
                            </v-list>
                            <v-divider />
                        </template>
                    </b-confirmation-dialog>
                </v-card>
            </form>
        </div>
    </v-row>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import i18n from '@/plugins/i18n'
import BConfirmationDialog from './BConfirmationDialog.vue'

export default {
    components: { BConfirmationDialog },
    name: 'PalmfileDropArea',
    computed: {
        ...mapGetters({
            allFiles: 'upload/allFiles',
            uploadedFiles: 'upload/uploadedFiles',
        }),
        ...mapState('upload', ['files']),
        ...mapState({
            joblist: state => state.queries.palm.joblist,
            licences: state => state.queries.meta[3].data,
            institutions: state => state.queries.meta[0].data,
        }),
    },
    methods: {
        ...mapActions({
            uploadFiles: 'upload/uploadFiles',
            requestNameCheck: 'upload/requestNameCheck',
            getJoblist: 'queries/getJoblist',
            fetchMeta: 'queries/fetchMeta',
            createPalmjob: 'upload/createPalmjob',
            info: 'alerts/info',
        }),
        async handleNameCheck(files) {
            if (!files.length) return
            let filenames = []
            files.forEach(file => {
                filenames.push(file.name)
            })
            let resp = await this.requestNameCheck(filenames)
            let nameCheckResult = await resp.json()
            console.log(nameCheckResult)
            if (resp.status !== 200) {
                this.info({
                    type: 'warning',
                    message: nameCheckResult,
                })
                return
            } else if (!nameCheckResult.job_exists) {
                this.job.job_name = nameCheckResult.job_name
                this.info({
                    type: 'warning',
                    message: i18n.t('alerts.job_doesnt_exist'),
                })
                this.showCreatePalmjob = true
                return
            } else {
                this.job.job_name = nameCheckResult.job_name
                this.toUpload = files
            }
        },
        async handleSubmit() {
            this.isSaving = true
            this.toUpload.forEach(file => {
                file.job = this.job.job_name
                file.db_filetype = 'palmfile'
                this.uploadFiles({
                    file,
                    ignore_warnings: false,
                    ignore_errors: false,
                })
            })
            await new Promise(r => setTimeout(r, 1000))
            this.isSaving = false
        },
    },
    created() {
        this.getJoblist()
        this.fetchMeta('license')
        this.fetchMeta('institution')
    },
    data() {
        return {
            uploadError: null,
            isSaving: false,
            uploadFieldName: 'Palm File',
            fileCount: null,
            job: {
                job_name: null,
                licence: '',
                institution_acronyms: '',
                description: null,
            },
            toUpload: {},
            palmjobs: [],
            showCreatePalmjob: false,
            fileTypes: [
                'P3D',
                'DYNAMIC',
                'CHEMISTRY',
                'STATIC',
                'RLW',
                'RSW',
                'VMEAS',
                'PALMCONFIG',
                'CSDCONFIG',
                'UC2',
            ],
        }
    },
}
</script>

<style lang="scss">
.dropbox {
    outline: 2px dashed black;
    outline-offset: -10px;
    color: 'warning';
    padding: 10px 10px;
    min-height: 200px;
    position: relative;
    z-index: 0;
    cursor: pointer;
    opacity: 50;
}

.input-file {
    opacity: 0;
    margin-left: -50%;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    cursor: pointer;
    background-color: #f83e70;
    justify-self: center;
}
</style>
