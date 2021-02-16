<template>
    <v-row align="center">
        <div class="container">
            <form enctype="multipart/form-data" novalidate>
                <v-card class="dropbox primary accent--text text-center" outline block flat hover xs12 md6>
                    <input
                        id="droparea-input"
                        type="file"
                        multiple
                        :name="uploadFieldName"
                        :disabled="isSaving"
                        @change="handleSubmit($event.target.files)"
                        fileCount="$event.target.files.length"
                        accept="application/x-netcdf"
                        class="input-file"
                    />
                    <p v-if="!isSaving" v-html="$t('upload.droparea')" />
                    <p v-show="isSaving">
                        {{ $tc('upload.uploading1', fileCount, { count: fileCount }) }}
                        {{ $tc('upload.uploading2', fileCount) }}
                        {{ $t('upload.uploading3') }}
                    </p>
                    <v-text-field v-show="isSaving" color="black" loading disabled></v-text-field>
                </v-card>
            </form>
        </div>
    </v-row>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import i18n from '@/plugins/i18n'

export default {
    name: 'DropArea',
    computed: {
        ...mapGetters({
            allFiles: 'upload/allFiles',
            uploadedFiles: 'upload/uploadedFiles',
        }),
        ...mapState('upload', ['files']),
    },
    methods: {
        ...mapActions({
            uploadFiles: 'upload/uploadFiles',
            info: 'alerts/info',
        }),
        isNetcdf(files) {
            files.forEach(file => {
                if (file.type !== 'application/x-netcdf') {
                    throw i18n.t('alerts.not_netcdf')
                }
            })
        },
        async handleSubmit(files) {
            if (!files.length) return

            try {
                this.isNetcdf(files)
            } catch (error) {
                this.info({
                    type: 'error',
                    message: error,
                })
                return
            }

            this.isSaving = true

            files.forEach(file => {
                this.uploadFiles({
                    file,
                    db_filetype: 'uc2',
                    ignore_warnings: false,
                    ignore_errors: false,
                })
            })
            await new Promise(r => setTimeout(r, 2000))
            this.isSaving = false
        },
    },
    data() {
        return {
            uploadError: null,
            isSaving: false,
            uploadFieldName: 'netCDF',
            fileCount: null,
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
